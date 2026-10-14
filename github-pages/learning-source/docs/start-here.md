# Start here

Learn to build SIESTA, run a two-atom silicon calculation, choose numerical settings, and check a relaxed structure. These lessons follow Charles Rotich's supplied files and results, with complete downloads so you can inspect every input.

## Choose your starting point

If you are new to scientific computing, follow the lessons in order. If SIESTA already works on your machine, start with the silicon input and first SCF lesson. Experienced readers can open the convergence tables and reference outputs directly.

| Lesson | You will be able to |
| --- | --- |
| Installation | Build an MPI-enabled executable with Ubuntu system libraries |
| Silicon input | Explain the cell, basis, functional and numerical controls |
| First SCF | Run a calculation and confirm electronic convergence |
| Convergence | Compare mesh, k-point and lattice scans quantitatively |
| Relaxation | Interpret force, stress and final-geometry checks |
| Troubleshooting | Diagnose failures without confusing completion with convergence |
| Doxygen | Document the teaching Python scripts and shell launcher |

## What you need

- A Linux workstation or an allocated HPC compute node.
- Bash and basic terminal navigation.
- An MPI-enabled SIESTA build; the installation lesson targets Ubuntu 26.04.
- Python 3 for the standard-library teaching scripts.
- NumPy and Matplotlib only if you want to regenerate the original plots.

The installation lesson needs administrator access for Ubuntu packages. On a managed cluster, use the compiler/MPI modules approved by your administrators rather than installing workstation packages.

## Download and inspect the course

Download the complete course ZIP from the Downloads page, extract it with your file manager, and open a terminal in the extracted `computational-materials-learning` folder.

```bash
pwd
ls
ls examples/silicon-diamond
```

You should see `docs`, `examples`, `reference`, `scripts` and `doxygen`. Run the lesson commands one block at a time; do not execute the Markdown file as a shell script.

## The calculation workflow

1. Define the material and physical model: silicon, PBEsol, a DZP basis, and a norm-conserving pseudopotential.
2. Solve the electronic problem at fixed geometry: SCF.
3. Check numerical accuracy by changing one setting at a time.
4. Relax geometry using converged electronic calculations at each step.
5. Inspect final forces, stress and structure; archive the inputs and output together.

SCF is the repeated solution of the electronic density and Hamiltonian until they agree within tolerance. Relaxation moves atoms or changes the cell using calculated forces and stress. A converged SCF cycle is necessary at each geometry, but does not by itself establish a converged geometry.

## Where the evidence comes from

The course includes the author's completed runs and scan tables. The reference SCF reports `-230.042602 eV` for the two-atom primitive cell. The installation guide targets SIESTA 5.4.2, while the executable banner in both outputs reads `unreleased e486d1206 (2025-12-16)`. Record that distinction when reproducing the work.

The reference files have been inspected. The SIESTA build and numerical calculations have not been repeated in the website-building environment. See [the source audit](../SOURCE_AUDIT.md) for the exact provenance and limitations.

## A small first exercise

Before running anything, answer: how many atoms are in the silicon input, and how many valence electrons should that pseudopotential provide? The input has two Si atoms; the PSML file specifies four valence electrons per Si, so the neutral cell contains eight.

Continue with [installing SIESTA](installation.md), or [understanding the silicon input](silicon-input.md) if your executable is already ready.
