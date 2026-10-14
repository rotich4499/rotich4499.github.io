# Run your first SCF calculation

At fixed atomic positions and cell vectors, solve the electronic problem until the density matrix and Hamiltonian satisfy the chosen tolerances. This lesson uses the input from the previous page and the same PBEsol Si pseudopotential.

## 1. Prepare a fresh directory

Start in the extracted course folder:

```bash
mkdir -p runs
export SCF_RUN="$(mktemp -d "$PWD/runs/scf-manual-XXXXXX")"
cp examples/silicon-diamond/scf/si_scf.fdf "$SCF_RUN/si.fdf"
cp examples/silicon-diamond/pseudopotentials/Si.psml "$SCF_RUN/"
cd "$SCF_RUN"
ls
```

You should see `si.fdf` and `Si.psml`. A fresh folder makes the initial condition clear and avoids an accidental density-matrix restart from an unrelated calculation.

## 2. Run one of these alternatives

For a small one-process run:

```bash
export OMP_NUM_THREADS=1
export OPENBLAS_NUM_THREADS=1
siesta < si.fdf > si.out 2> si.err
```

For an MPI-enabled executable with four processes:

```bash
export OMP_NUM_THREADS=1
export OPENBLAS_NUM_THREADS=1
mpirun -np 4 siesta < si.fdf > si.out 2> si.err
```

Choose a process count supported by your machine or allocation. Four processes is the supplied script's example; it is not a universal optimum. A two-atom calculation may be faster with fewer processes because MPI has overhead.

The `<` operator supplies the input; `>` writes standard output; `2>` captures standard error. On a cluster, put the launch inside an allocation using the scheduler's recommended launcher. The archive does not contain a verified Slurm submission script.

## 3. Inspect progress and completion

```bash
tail -30 si.out
grep -E 'SCF cycle converged|Job completed' si.out
grep 'siesta:         Total =' si.out | tail -1
grep 'siesta:         Fermi =' si.out | tail -1
```

Check both electronic convergence and normal termination. A finite energy printed during an incomplete job does not establish success.

The supplied [SCF reference output](../reference/silicon-diamond/scf_si/si_scf.out) reports:

```text
SCF cycle converged after 18 iterations
siesta:         Total =    -230.042602
siesta:         Fermi =      -4.326879
Job completed
```

## 4. Interpret the result

| Quantity | Reference | Interpretation |
| --- | --- | --- |
| Total energy | -230.042602 eV | Energy of the two-atom computational cell |
| Fermi energy | -4.326879 eV | Fermi level in this calculation's internal potential convention |
| SCF cycles | 18 | Electronic iterations in the supplied run |
| Electrons | 8 | Neutral cell with four valence electrons per Si |

Absolute total energy depends on the pseudopotential, basis and numerical choices. It is useful for comparing compatible calculations of the same system; it is not by itself a formation energy or cohesive energy. The reported Fermi level is not vacuum-aligned, and does not give the band gap by itself.

Small differences across machines and builds are possible. If the difference is substantial, compare the echoed input, pseudopotential hash, basis defaults, mesh, k-grid, solver and convergence criteria before drawing a physical conclusion.

## 5. Use the portable launcher

Return to the course root. The supplied teaching helper performs the fresh-folder setup and validation for you:

```bash
bash scripts/run_calculation.sh scf 4
```

It prints a new `runs/scf-...` path and a JSON summary. Inspect the output directly as well. You can independently read the author's output without running SIESTA:

```bash
python3 scripts/read_results.py reference/silicon-diamond/scf_si/si_scf.out
```

The output reader checks final energy, an SCF-convergence message and normal completion. Geometry convergence and numerical convergence are separate checks.

## Check your understanding

If the SCF cycle reaches its maximum iteration count, adding more iterations may help, but the reason could be unstable mixing or an unsuitable setup. Examine the convergence history before changing several settings at once.

Continue to [convergence tests](convergence.md). Keep `si.fdf`, `Si.psml`, `si.out`, `si.err` and the executable banner together as your run record.
