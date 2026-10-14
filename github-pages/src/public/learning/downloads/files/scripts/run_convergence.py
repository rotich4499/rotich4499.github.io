#!/usr/bin/env python3
"""! @file run_convergence.py
@brief Run a silicon mesh, k-point, or lattice scan in a fresh directory.

Preserves the settings and ranges of the uploaded reference templates.
No existing reference data or previous calculation is overwritten.
"""
import argparse
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
from read_results import read_result

ROOT = Path(__file__).resolve().parents[1]
SETUPS = {
    "mesh": ("si_mesh_template.fdf", "CUTOFF", [100, 150, 200, 250, 300, 350, 400, 450, 500]),
    "kpoints": ("si_kconv_template.fdf", "KGRID", [2, 4, 6, 8, 10, 12, 14]),
    "lattice": ("si_lattice_template.fdf", "LATTICE", [5.36, 5.38, 5.40, 5.42, 5.44, 5.46, 5.48, 5.50, 5.52]),
}


def run_scan(kind, processes=4):
    """! @brief Generate inputs, run MPI jobs, and record validated energies.
    @param kind One of mesh, kpoints, or lattice.
    @param processes Number of MPI processes.
    @return Path to the newly created scan directory.
    @exception RuntimeError Raised if an executable is unavailable or a run fails.
    """
    siesta = shutil.which(os.environ.get("SIESTA_EXE", "siesta"))
    mpirun = shutil.which("mpirun")
    if not siesta or not mpirun:
        raise RuntimeError("Both siesta and mpirun must be on PATH")
    template_name, marker, values = SETUPS[kind]
    template = (ROOT / "examples/silicon-diamond/convergence" / template_name).read_text()
    if marker not in template:
        raise RuntimeError("Template placeholder is missing")
    (ROOT / "runs").mkdir(exist_ok=True)
    destination = Path(tempfile.mkdtemp(prefix=kind + "-", dir=ROOT / "runs"))
    environment = {**os.environ, "OMP_NUM_THREADS": "1", "OPENBLAS_NUM_THREADS": "1"}
    with (destination / "results.dat").open("w") as table:
        table.write("# parameter  [LatticeConstant_Ang_for_lattice]  energy_eV_per_2_atom_cell\n")
        for value in values:
            run_dir = destination / str(value).replace(".", "_")
            run_dir.mkdir()
            substitution = f"{value / 2:.10f}" if kind == "lattice" else str(value)
            (run_dir / "si.fdf").write_text(template.replace(marker, substitution))
            shutil.copy2(ROOT / "examples/silicon-diamond/pseudopotentials/Si.psml", run_dir)
            with (run_dir / "si.fdf").open() as inp, (run_dir / "si.out").open("w") as out, (run_dir / "si.err").open("w") as err:
                subprocess.run([mpirun, "-np", str(processes), siesta], cwd=run_dir,
                               stdin=inp, stdout=out, stderr=err, env=environment, check=True)
            energy = read_result(run_dir / "si.out")["energy_ev_per_cell"]
            columns = f"{value:.8f} {value/2:.10f}" if kind == "lattice" else str(value)
            table.write(f"{columns} {energy:.9f}\n")
            table.flush()
            print(f"{kind} {value}: {energy:.9f} eV/cell", flush=True)
    return destination


def main():
    """! @brief Parse scan type and MPI count from command-line arguments."""
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("kind", choices=SETUPS)
    parser.add_argument("--np", type=int, default=4, dest="processes")
    args = parser.parse_args()
    if args.processes < 1:
        parser.error("--np must be at least 1")
    try:
        print("Results:", run_scan(args.kind, args.processes))
    except (RuntimeError, ValueError, OSError, subprocess.CalledProcessError) as error:
        parser.exit(1, str(error) + "\n")


if __name__ == "__main__":
    main()
