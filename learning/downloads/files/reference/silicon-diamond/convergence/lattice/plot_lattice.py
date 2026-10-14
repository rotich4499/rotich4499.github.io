import numpy as np
import matplotlib.pyplot as plt

# Read lattice-scan data
data = np.loadtxt("lattice_scan.dat", comments="#")

a = data[:, 0]
energy = data[:, 2]

# ------------------------------------------------------------
# Quadratic fit around the minimum
# Use 5.40--5.48 Ang
# ------------------------------------------------------------

mask = (a >= 5.40) & (a <= 5.48)

coeff = np.polyfit(a[mask], energy[mask], 2)

A, B, C = coeff

# Position of quadratic minimum
a0 = -B / (2.0 * A)
E0 = np.polyval(coeff, a0)

print("====================================")
print(" Si PBEsol lattice optimization")
print("====================================")
print(f"Equilibrium a0 = {a0:.6f} Ang")
print(f"LatticeConstant = {a0/2:.6f} Ang")
print(f"Fitted minimum energy = {E0:.9f} eV")
print("====================================")

# Smooth fitted curve
a_fit = np.linspace(5.36, 5.52, 400)
E_fit = np.polyval(coeff, a_fit)

# ------------------------------------------------------------
# Plot
# ------------------------------------------------------------

plt.figure(figsize=(8, 6))

plt.scatter(
    a,
    energy,
    s=55,
    label="SIESTA calculations"
)

plt.plot(
    a_fit,
    E_fit,
    linewidth=1.8,
    label="Quadratic fit"
)

plt.axvline(
    a0,
    linestyle="--",
    linewidth=1.3,
    label=rf"$a_0={a0:.4f}$ $\AA$"
)

plt.xlabel(r"Conventional lattice constant $a$ ($\AA$)", fontsize=13)
plt.ylabel("Total Energy (eV)", fontsize=13)

plt.title(
    "Si PBEsol Lattice-Constant Optimization",
    fontsize=14
)

plt.grid(True, linestyle="--", alpha=0.5)
plt.legend()

plt.tight_layout()

plt.savefig(
    "Si_lattice_optimization.png",
    dpi=300,
    bbox_inches="tight"
)

plt.show()
