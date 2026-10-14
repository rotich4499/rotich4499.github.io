# Troubleshoot and reproduce

Start with the last successful stage: build, launch, pseudopotential reading, electronic convergence, or geometry convergence. Change one cause at a time and keep the failed output for comparison.

## Installation and launch checks

| Symptom | Inspect first | Next action |
| --- | --- | --- |
| siesta: command not found | `command -v siesta` and PATH | Activate the installed bin directory |
| Shared library not found | `ldd` output | Resolve the missing library in the intended toolchain |
| MPI symbols / library conflicts | MPI wrappers and CMakeCache | Reconfigure in a dedicated build folder with one MPI stack |
| CMake cannot find a dependency | Configure log and pkg-config metadata | Check package installation and compatible paths |
| Process count rejected | Available cores / scheduler allocation | Reduce MPI count to fit the resources |
| Run ends without Job completed | `si.err` and final output lines | Diagnose the actual failure before accepting an energy |

The installation guide uses `pipefail` with `tee` so build failures remain failures. Keep configure, build and test logs; the absence of the word "error" in a search is not enough to certify a successful build.

## Missing or incorrect pseudopotential

The species label is `Si`, so this course places `Si.psml` beside the input. Verify the file exists and its hash matches the reference.

```bash
ls -l Si.psml
sha256sum Si.psml
```

A file with the correct name but a different functional, valence configuration or generation choice is a different scientific model. Do not compare its absolute energy directly against the reference without recording the change.

## SCF does not converge

Inspect the iteration history, electronic occupations, initial geometry and mixed quantity. Lowering the mixing weight or allowing more iterations may help, but do not change the functional, basis, mesh and k-grid simultaneously just to make the message disappear.

SIESTA 5.4 normally mixes the Hamiltonian, even though several historical options have `DM.` names. Read the reported convergence criterion and mixed quantity in the output.

## The relaxation finishes but the structure is wrong

Check the cell convention first. In this example, `LatticeConstant` is half the conventional cubic parameter. A scale-factor mistake can change the cell dramatically while the input remains syntactically valid.

Then inspect:

- Final forces against the specified force tolerance.
- All stress components against the target stress and tolerance.
- Whether the maximum number of geometry steps was reached.
- Whether cell relaxation was actually enabled.
- Whether the intended cell/atomic constraints were used.

The author's starting geometry is already near equilibrium. An unchanged final structure is consistent with the small reported forces and stress.

## Restart deliberately

`DM.UseSaveDM` can allow reading a saved density matrix. The teaching launchers use a fresh folder, making accidental reuse less likely. For an intentional restart, use compatible geometry/species/settings and keep the earlier input and output. Record that a restart was used.

Restart files are practical aids, not part of the small public reference package. Retain large files locally only when needed for continuation or analysis.

## Reproducibility checklist

For each new run, save:

1. The exact `.fdf` input and included files.
2. The pseudopotential, upstream source and SHA-256 hash.
3. SIESTA banner, source commit if known, compiler and MPI versions.
4. Basis details, grid, k-mesh, electronic tolerance and spin/charge settings.
5. Launch command, process count and any restart information.
6. Complete output, error log and final structure.
7. Analysis script and units used in each reported table.

## What is and is not established here

The completed outputs and scan tables establish the reported example results. They do not supply basis-size convergence, a force/stress convergence study, raw per-point scan outputs, or proof that the reduced teaching build is identical to the reference executable. These gaps are recorded, not filled with guessed results.

If requesting help, provide the input, the first part of the output showing the build identity, the last output lines and the actual error. Share enough context to diagnose the stage that failed.

Continue to [the Doxygen exercise](doxygen.md). Full provenance: [source audit](../SOURCE_AUDIT.md).
