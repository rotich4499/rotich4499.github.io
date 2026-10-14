# Source review for Phase 1

Reviewed 14 October 2026. Inputs were `results.tar.gz` and `SIESTA_5.4.2_UBUNTU26_SYSTEM_LIBS_GUIDE.md`.

## Preserved evidence

The original inputs and reference outputs are retained under `reference/`; the original guide is retained under `source-guides/`. None of their numerical values is replaced. The two reference outputs end with `Job completed` and report an electronically converged cycle.

| Item | What the source reports |
| --- | --- |
| Intended SIESTA release | 5.4.2, from the author note and installation guide |
| Executable banner | `unreleased e486d1206 (2025-12-16)` |
| Compiler | GNU 15.2.0, MPI-enabled x86_64 build |
| Reference solver support | ELSI with external ELPA, NTPoly, OMM and PEXSI |
| Teaching build | Native ELPA and ELSI disabled; ordinary diagonalisation for this example |
| SCF result | -230.042602 eV per two-atom cell; Fermi energy -4.326879 eV |
| Relaxation result | -230.042602 eV/cell; Fermi energy -4.326875 eV |
| Relaxation diagnostics | Maximum force 0.000011 eV/Ang; pressure -0.26020609 kbar |
| Final geometry | Primitive vectors with off-diagonal elements 2.72105 Ang; cell volume 40.293924 Ang³ |
| Lattice fit | Quadratic fit over 5.40–5.48 Ang gives 5.44206294 Ang |

The exact correspondence between the banner commit and the release tag has not been independently established. Reproducers should record the executable banner and source commit, not silently replace it with the release label. The reference feature list differs from the reduced teaching build; no bitwise reproducibility claim is made.

## Pseudopotential

All five supplied `Si.psml` copies are identical.

SHA-256: `fa0e9fa6ca7a97ab07879cd1bc8d858ebb32a90f262535b578d14d4d515bdc95`.

The file itself reports PSML 1.1, scalar-relativistic ONCVPSP, four valence electrons, PBEsol exchange/correlation (LibXC 116 and 133), generator `ONCVPSP-3.3.0+psml-3.3.0-73`, and date 2018-03-01. The author's note describes PseudoDojo NC SR, v0.4.1, stringent, PSML. The collection label v0.4.1 and generator version 3.3.0 describe different things; the exact upstream per-element download URL was not supplied.

## Educational changes

- The web guide adds explanations, checkpoints and optional dependency roles.
- Destructive directory deletion from the source guide is replaced by dedicated versioned folders and reuse checks.
- Library names replace the original hard-coded `/usr/lib/x86_64-linux-gnu` paths.
- The original `MD.Steps` input is retained; this is a documented SIESTA 5.4 minimisation limit.
- The new launchers accept a configurable MPI count, use fresh run directories, check exit status, and require final energy plus SCF convergence plus normal termination.
- The original scan scripts remain visible as reference material, but the course uses `run_convergence.py` for fresh reproducible runs.
- Data tables distinguish energy per cell from energy per atom and use the highest sampled setting as a reference.

## Limits

The supplied scans use `DM.Tolerance 1.0d-5`, while the final SCF/relaxation inputs use `1.0d-7`. Mesh and lattice scans use 200 Ry for final choices; the k-point scan uses 400 Ry. The reference inputs rely on SIESTA basis defaults beyond `split/DZP`. Basis confinement and basis-size convergence, force/stress convergence versus numerical settings, and a full installation log are not supplied.

The starting relaxation structure is already close to the local quadratic minimum. Its final cell and fractional coordinates are unchanged at the printed precision. This demonstrates convergence checks, not an independently observed large structural relaxation.
