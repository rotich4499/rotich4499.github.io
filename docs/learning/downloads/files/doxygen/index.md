# SIESTA learning scripts

This reference describes the Python utilities used by Charles Rotich's silicon course. The tutorials and complete calculation data remain in the companion course package.

- `read_results.py` reads final energy, Fermi energy, force and cell diagnostics from a completed SIESTA text output. It checks electronic convergence and normal termination; geometry and numerical convergence are separate assessments.
- `run_convergence.py` uses the supplied templates to run a fresh mesh, k-point or lattice scan. It records energies only after each job succeeds.
- The shell-launcher page explains `run_calculation.sh` and includes its source listing. It is manually described because Doxygen has no native Bash parser.

The run helpers require an MPI-enabled SIESTA executable. The output reader uses only the Python standard library and can inspect the included reference outputs without running SIESTA.
