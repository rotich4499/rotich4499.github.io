# Understand the silicon input

This example is elemental silicon in the diamond structure. It uses a two-atom primitive cell. Carbon diamond and silicon carbide are different systems; neither is represented by this input.

## The physical model

| Setting | Supplied value |
| --- | --- |
| Atoms / species | 2 Si atoms / 1 species |
| Functional | GGA PBEsol |
| Basis | Split, double-zeta plus polarisation (DZP) |
| Pseudopotential | Si PSML, norm-conserving, scalar relativistic |
| Valence electrons | 4 per Si; 8 in the neutral cell |
| Real-space grid | MeshCutoff 200 Ry |
| k-point mesh | 10×10×10, no shift |
| Final DM tolerance | 1.0d-7 |
| Charge | 0 |
| Spin | Non-polarised in the supplied output |

The final inputs do not specify every basis-confinement setting, electronic temperature or solver default. For exact reproduction, retain the echoed input and reported settings from the output alongside the executable version.

## Why the lattice constant is half the cubic parameter

The dimensionless primitive vectors are `(0,1,1)`, `(1,0,1)` and `(1,1,0)`. SIESTA multiplies them by `LatticeConstant`. For this representation, the conventional cubic parameter is `a = 2 × LatticeConstant`.

```text
LatticeConstant     2.72105 Ang

%block LatticeVectors
   0.0   1.0   1.0
   1.0   0.0   1.0
   1.0   1.0   0.0
%endblock LatticeVectors
```

Thus `a = 5.44210 Å`; each primitive-vector length is about 3.848146 Å, and the primitive volume is about 40.293924 Å³. The two basis atoms sit at fractional coordinates `(0,0,0)` and `(¼,¼,¼)` relative to the primitive vectors. Do not interpret those coordinates as fractions of a conventional cubic cell.

## Complete SCF input

Download [si_scf.fdf](../examples/silicon-diamond/scf/si_scf.fdf). The supplied input is:

```text
SystemName          Si_PBEsol_LatticeScan
SystemLabel         Si
NumberOfAtoms       2
NumberOfSpecies     1

%block ChemicalSpeciesLabel
   1   14   Si
%endblock ChemicalSpeciesLabel

PAO.BasisType       split
PAO.BasisSize       DZP
XC.functional       GGA
XC.authors          PBEsol

LatticeConstant     2.72105 Ang
%block LatticeVectors
   0.0   1.0   1.0
   1.0   0.0   1.0
   1.0   1.0   0.0
%endblock LatticeVectors

AtomicCoordinatesFormat Fractional
%block AtomicCoordinatesAndAtomicSpecies
   0.000000   0.000000   0.000000   1
   0.250000   0.250000   0.250000   1
%endblock AtomicCoordinatesAndAtomicSpecies

MeshCutoff          200 Ry
%block kgrid.MonkhorstPack
   10   0    0    0.0
    0  10    0    0.0
    0   0   10    0.0
%endblock kgrid.MonkhorstPack

MaxSCFIterations    150
DM.Tolerance        1.0d-7
DM.MixingWeight     0.10
SolutionMethod      diagon
NetCharge           0.0
```

The historical `SystemName` contains "LatticeScan" even though this file runs one SCF calculation. The run type is determined by the input options, not by this descriptive name.

## Read the important controls

| Entry | Meaning | What changes if you edit it? |
| --- | --- | --- |
| SystemLabel | Prefix for SIESTA-generated files | Output names and restart-file names |
| ChemicalSpeciesLabel | Species index, atomic number and symbol | Species-to-pseudopotential mapping |
| PAO.BasisSize | Local orbital basis size | Variational flexibility, cost and basis error |
| XC.authors | Exchange-correlation choice | Physical approximation; match the pseudopotential |
| MeshCutoff | Real-space integration-grid fineness | Grid accuracy and cost; not a plane-wave basis cutoff |
| kgrid.MonkhorstPack | Reciprocal-space sampling | Brillouin-zone integration accuracy |
| DM.Tolerance | Density-matrix convergence threshold | Electronic stopping accuracy |
| DM.MixingWeight | Mixing weight used during SCF | Convergence behaviour; not an accuracy guarantee |
| MaxSCFIterations | Upper limit on SCF cycles | Allows more attempts; does not guarantee convergence |
| SolutionMethod | Electronic solver | `diagon` uses diagonalisation |
| NetCharge | Cell charge relative to neutrality | Electron count and charged-system treatment |

SIESTA 5.4 normally mixes the Hamiltonian; a `DM.*` option name alone does not establish that density-matrix mixing was selected. The reference output explicitly reports Hamiltonian mixing and a DM+H convergence criterion.

## Check the pseudopotential

Use the supplied [Si.psml](../examples/silicon-diamond/pseudopotentials/Si.psml) rather than substituting a similarly named file. The author attributes it to [PseudoDojo](https://www.pseudo-dojo.org/), PBEsol, scalar-relativistic NC, stringent, PSML.

```bash
sha256sum examples/silicon-diamond/pseudopotentials/Si.psml
```

Expected SHA-256:

```text
fa0e9fa6ca7a97ab07879cd1bc8d858ebb32a90f262535b578d14d4d515bdc95
```

Its embedded provenance identifies ONCVPSP 3.3.0, PSML 1.1, LibXC PBEsol IDs 116 and 133, and four valence electrons. The author's collection label v0.4.1 is preserved separately in the source audit.

Exercise: if `LatticeConstant` were changed to `5.44210 Ang` while keeping these dimensionless vectors, the intended cubic parameter would double. This is why cell conventions must be stated explicitly.

Continue to [your first SCF run](first-scf.md). Parameter reference: [SIESTA 5.4 manual](https://docs.siesta-project.org/projects/siesta/en/5.4/reference/siesta.html).
