#!/bin/bash

CUTLIST="100 150 200 250 300 350 400 450 500"
RESULTS="mesh_convergence.dat"

echo "# Si PBEsol MeshCutoff convergence" > "$RESULTS"
echo "# Fixed k-grid = 10x10x10" >> "$RESULTS"
echo "# MeshCutoff(Ry)   TotalEnergy(eV)" >> "$RESULTS"

for CUT in $CUTLIST
do
    DIR="mesh_${CUT}"

    mkdir -p "$DIR"
    cp Si.psml "$DIR/"

    sed "s/CUTOFF/${CUT}/g" \
        si_mesh_template.fdf > "$DIR/si.fdf"

    echo
    echo "=========================================="
    echo " MeshCutoff = ${CUT} Ry"
    echo "=========================================="

    (
        cd "$DIR" || exit 1

        rm -f Si.DM

        mpirun -np 4 siesta \
            < si.fdf > si.out
    )

    if [[ $? -ne 0 ]]; then
        echo "ERROR: SIESTA failed at ${CUT} Ry"
        exit 1
    fi

    ENERGY=$(grep "siesta:         Total =" \
        "$DIR/si.out" | tail -1 | awk '{print $4}')

    if [[ -z "$ENERGY" ]]; then
        echo "ERROR: Could not extract energy at ${CUT} Ry"
        exit 1
    fi

    printf "%-12d %18.9f\n" \
        "$CUT" "$ENERGY" >> "$RESULTS"

    echo "MeshCutoff = ${CUT} Ry"
    echo "Energy     = ${ENERGY} eV"

done

echo
echo "=========================================="
echo " MESHCUTOFF CONVERGENCE RESULTS"
echo "=========================================="

cat "$RESULTS"
