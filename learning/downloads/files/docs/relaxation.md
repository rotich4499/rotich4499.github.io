# Relax the silicon structure

Use converged electronic calculations to compute forces and stress, then allow the optimisation algorithm to change atomic positions and the cell. The supplied example uses conjugate gradients (CG) with variable-cell relaxation.

## 1. Add the relaxation controls

The complete [si_relax.fdf](../examples/silicon-diamond/relaxation/si_relax.fdf) contains the SCF model from the earlier lesson plus these controls:

```text
MD.TypeOfRun        CG
MD.Steps            200
MD.VariableCell     .true.
MD.MaxForceTol      0.01 eV/Ang
MD.MaxStressTol     0.1 GPa
MD.TargetPressure   0.0 GPa
```

| Entry | What it controls |
| --- | --- |
| MD.TypeOfRun CG | Conjugate-gradient geometry minimisation |
| MD.Steps 200 | Maximum optimisation steps, not a requirement to take 200 steps |
| MD.VariableCell true | Optimise cell vectors as well as atomic positions |
| MD.MaxForceTol | Required force threshold for the geometry |
| MD.MaxStressTol | Required stress tolerance relative to the target |
| MD.TargetPressure | Desired hydrostatic pressure |

`MD.Steps` is the documented SIESTA 5.4 option; `MD.NumCGsteps` remains as a legacy option. For a fixed-cell atomic relaxation, set `MD.VariableCell .false.` in a separate input. Perfect bulk silicon has symmetry-constrained zero or near-zero forces, so fixed-cell relaxation alone cannot determine its equilibrium lattice parameter.

## 2. Launch in a new folder

From the course root:

```bash
bash scripts/run_calculation.sh relaxation 4
```

The helper copies the input and matching pseudopotential into a fresh `runs/relaxation-...` directory. Its SCF-checking summary is useful, but it does not replace the geometry checks below.

The reference relaxation uses the same 200 Ry grid, 10×10×10 k-mesh and `DM.Tolerance 1.0d-7` as the final SCF. It reports two electronic iterations. That shorter cycle can depend on the starting electronic state; it is not evidence that every fresh relaxation will converge in two iterations.

## 3. Inspect forces, stress and final structure

In your run directory:

```bash
grep -E 'SCF cycle converged|cgvc:|Job completed' si.out
grep -A 10 'Atomic forces' si.out | tail -12
grep 'Stress tensor Voigt' si.out | tail -1
grep -A 3 'Relaxed atomic coordinates' si.out | tail -4
grep -A 4 'outcell: Unit cell vectors' si.out | tail -5
```

The full [reference relaxation output](../reference/silicon-diamond/relax_si/si_relax.out) reports:

| Quantity | Reference | Check |
| --- | --- | --- |
| Maximum force | 0.000011 eV/Å | Below 0.01 eV/Å |
| Pressure | -0.26020609 kbar | Magnitude about 0.0260 GPa |
| Diagonal stress components | About 0.26 kbar | About 0.026 GPa, below the 0.1 GPa target tolerance |
| Final energy | -230.042602 eV/cell | Same printed value as the supplied SCF |
| Final volume | 40.293924 Å³ | Primitive two-atom cell |

Remember `1 kbar = 0.1 GPa`. Check the complete stress tensor, including shear components, rather than relying on hydrostatic pressure alone. A normal `Job completed` message can occur when the step limit is reached; compare the final diagnostics to the requested tolerances.

## 4. Why the cell did not visibly move

The starting cubic parameter is 5.44210 Å, already close to the fitted scan minimum of 5.44206294 Å. The reported forces and stress are below the chosen thresholds. The final vectors and fractional coordinates are unchanged at the printed precision:

```text
Primitive cell vectors (Å):
0.000000  2.721050  2.721050
2.721050  0.000000  2.721050
2.721050  2.721050  0.000000

Fractional coordinates:
0.00000000  0.00000000  0.00000000  Si
0.25000000  0.25000000  0.25000000  Si
```

This is a near-equilibrium convergence example. It does not demonstrate a large structural change or many geometry steps.

For a follow-up exercise, copy the input into a new directory and start at cubic `a = 5.50 Å`, which means `LatticeConstant 2.75 Ang` for these vectors. Run a fresh variable-cell relaxation and compare the final cell. That altered-start calculation has not been supplied or run here; label its results as your own new exercise.

## 5. Reuse the final geometry

SIESTA can write geometry/restart files during a calculation. Inspect the files your build actually produced. If an output geometry file is absent, the final `outcell` and `outcoor` blocks provide the reported geometry.

When transferring cell vectors already expressed in Å into an FDF block, use `LatticeConstant 1.0 Ang` with those physical vectors. Alternatively, keep the dimensionless primitive vectors and their scaling constant. Mixing both conventions would rescale the cell twice.

## Read further

[Official structural-optimisation tutorial](https://docs.siesta-project.org/projects/siesta/en/5.4/tutorials/basic/structure-optimization/index.html) and [SIESTA 5.4 parameter reference](https://docs.siesta-project.org/projects/siesta/en/5.4/reference/siesta.html).

Continue to [troubleshooting and reproducibility](troubleshooting.md).
