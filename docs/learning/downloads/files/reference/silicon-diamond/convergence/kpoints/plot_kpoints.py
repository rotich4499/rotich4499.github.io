import numpy as np
import matplotlib.pyplot as plt

# ============================================================
# Read k-point convergence data
# Column 1: k-grid
# Column 2: total energy (eV)
# ============================================================

data = np.loadtxt("kpoint_convergence.dat", comments="#")

k = data[:, 0]
energy = data[:, 1]

# ============================================================
# Plot
# ============================================================

plt.figure(figsize=(8, 6))

plt.plot(
    k,
    energy,
    marker="o",
    markersize=7,
    linewidth=1.8
)

plt.xlabel(r"$k$-point grid ($N\times N\times N$)", fontsize=13)
plt.ylabel("Total Energy (eV)", fontsize=13)
plt.title("Si PBEsol k-point Convergence", fontsize=14)

plt.xticks(k.astype(int))
plt.grid(True, linestyle="--", alpha=0.5)

plt.tight_layout()

# Save high-resolution figure
plt.savefig(
    "Si_kpoint_convergence.png",
    dpi=300,
    bbox_inches="tight"
)

plt.show()
