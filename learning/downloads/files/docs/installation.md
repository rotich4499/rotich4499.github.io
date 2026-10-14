# Install SIESTA with Ubuntu libraries

This lesson expands the author's Ubuntu 26.04 guide into a staged build with checkpoints. The main compiler, MPI and numerical libraries come from Ubuntu packages. SIESTA-specific dependencies such as libfdf or a compatible libgridxc may still be fetched and built by CMake; inspect the configure log to see what was actually used.

## 1. Check the environment

Use a normal Bash terminal. For this system-library route, deactivate Conda and avoid mixing private MPI or compiler paths with Ubuntu libraries. This lesson installs software on your existing Ubuntu system; it does not upgrade the operating system.

```bash
cat /etc/os-release
command -v gcc gfortran cmake mpifort
```

The reference output was produced on x86_64 with GNU 15.2.0. That is recorded provenance, not a requirement to copy a CPU-specific `-march=native` build onto other machines. Keep compiler and MPI versions consistent across the libraries you use.

## 2. Install the system packages

Refresh package information, then install the compiler/build tools and libraries used by this route:

```bash
sudo apt update
sudo apt install -y \
  build-essential git wget curl cmake pkg-config \
  gcc g++ gfortran openmpi-bin libopenmpi-dev \
  libopenblas-dev liblapack-dev libscalapack-openmpi-dev \
  libfftw3-dev libfftw3-mpi-dev \
  libhdf5-openmpi-dev libnetcdf-dev libnetcdf-mpi-dev libnetcdff-dev \
  libxc-dev libxmlf90-dev libpsml-dev libxml2-dev \
  python3 python3-dev python3-venv \
  make ninja-build autoconf automake libtool m4 \
  bison flex texinfo unzip
```

If a package has no installation candidate, stop and inspect `apt-cache policy PACKAGE_NAME`. Package availability depends on enabled Ubuntu repositories and architecture. Do not silently switch MPI implementations to get past a missing package.

| Component | Role |
| --- | --- |
| GCC / GFortran | Compile C, C++ and Fortran code |
| CMake, Make / Ninja | Configure and build the application |
| Open MPI | Run and compile MPI parallel programs |
| OpenBLAS / LAPACK | Dense linear algebra |
| ScaLAPACK | Distributed linear algebra for MPI |
| FFTW | FFT facilities where enabled |
| NetCDF / HDF5 | Scientific I/O and post-processing support |
| LibXC / libgridxc | Exchange-correlation functional support |
| libPSML / XMLF90 | Read PSML pseudopotentials and XML |

The teaching calculation uses ordinary diagonalisation. Native ELPA and ELSI are disabled in the configure command below to keep this first build smaller. This intentionally differs from the author's reference executable, which reports ELSI and external ELPA support. They can be introduced as an advanced build later.

## 3. Verify the compiler and MPI wrappers

```bash
gcc --version | head -1
gfortran --version | head -1
cmake --version | head -1
command -v mpicc mpifort mpirun
mpifort --showme:command
mpifort --showme:link
pkg-config --modversion libxc xmlf90 libpsml
```

The wrappers should identify the intended Ubuntu toolchain. A library version string is useful evidence; it is not proof that CMake selected that exact installation. The next log is the decisive check.

## 4. Prepare the source

Use dedicated versioned directories. These commands stop if a source folder already exists instead of deleting an existing installation.

```bash
export SIESTA_SRC="$HOME/src/siesta-5.4.2"
export SIESTA_BUILD="$HOME/build/siesta-5.4.2-system"
export SIESTA_PREFIX="$HOME/local/siesta-5.4.2-system"
export NBUILD="$(nproc)"
mkdir -p "$HOME/src" "$HOME/build" "$HOME/local"
test ! -e "$SIESTA_SRC" || { echo 'Source directory exists; inspect or reuse it.'; false; }
```

If the last command fails, resolve the existing folder before continuing. Download the source only after that check passes:

```bash
wget -O "$HOME/src/siesta-5.4.2.tar.gz" \
  https://gitlab.com/siesta-project/siesta/-/archive/5.4.2/siesta-5.4.2.tar.gz
tar -xzf "$HOME/src/siesta-5.4.2.tar.gz" -C "$HOME/src"
ls "$SIESTA_SRC"
mkdir -p "$SIESTA_BUILD"
```

For a later session, re-export these four variables. Build directories are tied to the compiler and MPI used during configuration; use another dedicated build directory when changing toolchains.

## 5. Configure

Enable `pipefail` so a failed CMake command is not hidden by successful logging through `tee`.

```bash
set -o pipefail
cmake \
  -S "$SIESTA_SRC" -B "$SIESTA_BUILD" \
  -G "Unix Makefiles" \
  -DCMAKE_INSTALL_PREFIX="$SIESTA_PREFIX" \
  -DCMAKE_BUILD_TYPE=Release \
  -DCMAKE_C_COMPILER=mpicc \
  -DCMAKE_Fortran_COMPILER=mpifort \
  -DSIESTA_WITH_MPI=ON \
  -DSIESTA_WITH_OPENMP=OFF \
  -DSIESTA_WITH_NETCDF=ON \
  -DSIESTA_WITH_LIBXC=ON \
  -DSIESTA_WITH_FLOOK=OFF \
  -DSIESTA_WITH_ELPA=OFF \
  -DSIESTA_WITH_ELSI=OFF \
  -DBLAS_LIBRARY=openblas \
  -DLAPACK_LIBRARY=openblas \
  -DSCALAPACK_LIBRARY=-lscalapack-openmpi \
  2>&1 | tee "$SIESTA_BUILD/siesta-configure.log"
```

Library names avoid the original guide's hard-coded x86_64 library paths. If detection fails, use the actual paths reported by your package manager; keep the selected libraries consistent with Open MPI. Required domain-library compatibility may cause CMake to build a bundled dependency.

```bash
tail -40 "$SIESTA_BUILD/siesta-configure.log"
grep -Ei 'MPI|BLAS|LAPACK|NETCDF|LIBXC|PSML|GRIDXC|FDF' \
  "$SIESTA_BUILD/CMakeCache.txt"
```

Continue only after configuration and generation succeed. Review warnings about unused manually specified variables and missing libraries rather than treating a partially generated folder as a completed build.

## 6. Build, test and install

```bash
cmake --build "$SIESTA_BUILD" --parallel "$NBUILD" \
  2>&1 | tee "$SIESTA_BUILD/siesta-build.log"
ctest --test-dir "$SIESTA_BUILD" --output-on-failure \
  2>&1 | tee "$SIESTA_BUILD/siesta-ctest.log"
cmake --install "$SIESTA_BUILD"
```

On a low-memory machine, reduce `NBUILD` before building. Passing tests is useful only if tests were actually discovered and run; a "No tests were found" message is not equivalent to a validated scientific installation.

## 7. Activate and check

```bash
export PATH="$SIESTA_PREFIX/bin:$PATH"
hash -r
command -v siesta
ldd "$SIESTA_PREFIX/bin/siesta" | grep -E 'mpi|blas|scalapack|netcdf|xc|not found'
```

`not found` indicates a missing shared library. On a dynamically linked build, confirm that the MPI library paths match the Ubuntu MPI wrappers used during configuration. To activate SIESTA in future terminals, add these lines once to `~/.bashrc` using your editor:

```bash
export SIESTA_HOME="$HOME/local/siesta-5.4.2-system"
export PATH="$SIESTA_HOME/bin:$PATH"
```

Open a new terminal, or source your edited file. Your first completed SCF output will supply the executable banner and a small end-to-end numerical check.

## Keep the build record

Retain configure, build and test logs, the compiler/MPI versions and the first successful output. The author's note names 5.4.2, but the supplied outputs display a commit banner. Record what your executable prints rather than promising identical results from every build.

Sources: [author's original guide](../source-guides/SIESTA_5.4.2_UBUNTU26_SYSTEM_LIBS_GUIDE.md), [official SIESTA build instructions](https://docs.siesta-project.org/projects/siesta/en/5.4/installation/build-manually.html), and [Ubuntu package catalogue](https://packages.ubuntu.com/).
