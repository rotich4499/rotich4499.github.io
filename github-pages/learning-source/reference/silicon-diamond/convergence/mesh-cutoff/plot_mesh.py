import numpy as np
import matplotlib.pyplot as plt

data = np.loadtxt("mesh_convergence.dat", comments="#")

cutoff = data[:, 0]
energy = data[:, 1]

plt.figure(figsize=(8, 6))

plt.plot(
    cutoff,
    energy,
    marker="o",
    markersize=7,
    linewidth=1.8
)

# Mark selected cutoff
plt.axvline(
    200,
    linestyle="--",
    linewidth=1.3,
    label="Selected = 200 Ry"
)

plt.xlabel("MeshCutoff (Ry)", fontsize=13)
plt.ylabel("Total Energy (eV)", fontsize=13)
plt.title("Si PBEsol MeshCutoff Convergence", fontsize=14)

plt.xticks(cutoff.astype(int))
plt.grid(True, linestyle="--", alpha=0.5)
plt.legend()

plt.tight_layout()

plt.savefig(
    "Si_meshcutoff_convergence.png",
    dpi=300,
    bbox_inches="tight"
)

plt.show()
