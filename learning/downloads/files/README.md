# Computational materials learning

Step-by-step SIESTA lessons and reproducible silicon-diamond examples by Charles Kipchumba Rotich.

The first course covers an Ubuntu system-library build, a two-atom silicon SCF calculation, numerical convergence, variable-cell relaxation, and a first Doxygen workflow. Read each lesson before running its commands.

## Course

1. [Start here](docs/start-here.md)
2. [Install SIESTA](docs/installation.md)
3. [Understand the silicon input](docs/silicon-input.md)
4. [Run your first SCF calculation](docs/first-scf.md)
5. [Test convergence](docs/convergence.md)
6. [Relax the structure](docs/relaxation.md)
7. [Troubleshoot and reproduce](docs/troubleshooting.md)
8. [Document the scripts with Doxygen](docs/doxygen.md)

## Get the course

Clone this repository to keep the editable lessons, calculation inputs and reference results together:

```bash
git clone https://github.com/rotich4499/computational-materials-learning.git
cd computational-materials-learning
```

## Quick run

After installing an MPI-enabled SIESTA executable and entering the repository folder:

```bash
bash scripts/run_calculation.sh scf 4
bash scripts/run_calculation.sh relaxation 4
```

Both launchers create fresh folders under `runs/`. The number 4 is a small example MPI count; change it to suit your machine. Launchers should be run on a workstation or allocated compute node, not an HPC login node.

## Reference and teaching files

- `reference/silicon-diamond/` preserves the supplied inputs, outputs, scans, plots, scripts and note.
- `source-guides/` preserves the supplied installation guide.
- `examples/` contains the corresponding teaching inputs and one copy of the Si PSML pseudopotential.
- `scripts/` contains portable launchers and a documented output reader.
- `SOURCE_AUDIT.md` records differences, build identity and verification limits.

Completed reference calculations were supplied by the author. They have been inspected; the installation and scientific runs have not been repeated in the website-building environment. Syntax and output-reader checks are separate from numerical validation.

## Attribution and reuse

The Si pseudopotential is attributed to PseudoDojo and ONCVPSP; retain its provenance. Third-party software and files retain their upstream terms. No new blanket licence is assigned in this draft. A proposed future split is MIT for original teaching code and CC BY 4.0 for original tutorial prose and figures, subject to the author's decision and third-party exclusions.
