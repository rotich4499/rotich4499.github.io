# Ubuntu 26.04 System-Dependencies Installation Guide

**Approach:** use Ubuntu 26.04 packages for compilers and scientific libraries.  
**No private MPI / BLAS / ScaLAPACK / HDF5 / NetCDF / LibXC / XMLF90 / libPSML / ELPA stack is built.**

> Run the commands in order in a normal Bash terminal.  
> Do not use Conda and do not use an isolated `env -i` shell.

## Part I — Install Ubuntu dependencies

### 1. Update Ubuntu

```bash
sudo apt update
sudo apt upgrade -y
```

### 2. Install compilers, MPI, math and I/O libraries

```bash
sudo apt install -y \
  build-essential \
  git wget curl \
  cmake pkg-config \
  gcc g++ gfortran \
  openmpi-bin libopenmpi-dev \
  libopenblas-dev liblapack-dev \
  libscalapack-openmpi-dev \
  libfftw3-dev libfftw3-mpi-dev \
  libhdf5-openmpi-dev \
  libnetcdf-dev libnetcdf-mpi-dev libnetcdff-dev \
  libxc-dev \
  libxmlf90-dev \
  libpsml-dev \
  libelpa-dev \
  libxml2-dev \
  python3 python3-dev python3-venv \
  make ninja-build \
  autoconf automake libtool m4 \
  bison flex texinfo unzip
```

### 3. Verify the system stack

```bash
gcc --version | head -1
gfortran --version | head -1
cmake --version | head -1

which mpicc
which mpifort
mpifort --showme:command

pkg-config --modversion libxc
pkg-config --modversion xmlf90
pkg-config --modversion libpsml
pkg-config --modversion elpa
```

Check major system libraries:

```bash
ldconfig -p | grep -E \
'libopenblas|libscalapack|libfftw3|libhdf5|libnetcdf|libnetcdff|libxc|libpsml|libelpa' \
| head -80
```

Create a source directory:

```bash
mkdir -p "$HOME/src"
export NBUILD="$(nproc)"
```


# Part II — SIESTA 5.4.2

## 4. Download SIESTA 5.4.2

```bash
cd "$HOME/src"

rm -rf "$HOME/src/siesta-5.4.2"
rm -f "$HOME/src/siesta-5.4.2.tar.gz"

wget -O "$HOME/src/siesta-5.4.2.tar.gz" \
https://gitlab.com/siesta-project/siesta/-/archive/5.4.2/siesta-5.4.2.tar.gz

tar -xzf "$HOME/src/siesta-5.4.2.tar.gz"
```

Verify:

```bash
cd "$HOME/src/siesta-5.4.2"
pwd
ls
```

## 5. Create a clean build directory

```bash
cd "$HOME"

rm -rf "$HOME/siesta-build"
rm -rf "$HOME/siesta-install"

mkdir -p "$HOME/siesta-build"
mkdir -p "$HOME/siesta-install"
```

## 6. Configure SIESTA

For this Ubuntu-system build, use system Open MPI, OpenBLAS and ScaLAPACK.  
ELPA is left disabled to avoid API-version mismatches; SIESTA works without it.

```bash
cmake \
  -S "$HOME/src/siesta-5.4.2" \
  -B "$HOME/siesta-build" \
  -G "Unix Makefiles" \
  -DCMAKE_INSTALL_PREFIX="$HOME/siesta-install" \
  -DCMAKE_BUILD_TYPE=Release \
  -DCMAKE_C_COMPILER=mpicc \
  -DCMAKE_Fortran_COMPILER=mpifort \
  -DSIESTA_WITH_MPI=ON \
  -DSIESTA_WITH_MPI_INTERFACES=f08 \
  -DSIESTA_WITH_OPENMP=OFF \
  -DSIESTA_WITH_NETCDF=ON \
  -DSIESTA_WITH_FLOOK=OFF \
  -DSIESTA_WITH_ELPA=OFF \
  -DBLAS_LIBRARY=/usr/lib/x86_64-linux-gnu/libopenblas.so \
  -DLAPACK_LIBRARY=/usr/lib/x86_64-linux-gnu/libopenblas.so \
  -DSCALAPACK_LINKER_FLAG=-lscalapack-openmpi \
  -DSCALAPACK_LIBRARY=/usr/lib/x86_64-linux-gnu/libscalapack-openmpi.so \
  2>&1 | tee "$HOME/siesta-build/siesta-configure.log"
```

Check the end:

```bash
tail -30 "$HOME/siesta-build/siesta-configure.log"
```

## 7. Build

```bash
cmake --build "$HOME/siesta-build" --parallel "$NBUILD" \
2>&1 | tee "$HOME/siesta-build/siesta-build.log"
```

Check errors:

```bash
grep -niE \
'error:|undefined reference|FAILED|fatal error|ld returned' \
"$HOME/siesta-build/siesta-build.log" | tail -80
```

## 8. Test

```bash
cd "$HOME/siesta-build"

ctest --output-on-failure \
2>&1 | tee "$HOME/siesta-build/siesta-ctest.log"
```

## 9. Install

```bash
cmake --install "$HOME/siesta-build"
```

Verify:

```bash
find "$HOME/siesta-install/bin" -maxdepth 1 -type f -executable -printf '%f\n' | sort
```

## 10. Make SIESTA permanent

```bash
cat >> "$HOME/.bashrc" <<'EOF'

# SIESTA 5.4.2
export SIESTA_HOME="$HOME/siesta-install"
export PATH="$SIESTA_HOME/bin:$PATH"
EOF

source "$HOME/.bashrc"
hash -r
```

Verify:

```bash
which siesta
```
