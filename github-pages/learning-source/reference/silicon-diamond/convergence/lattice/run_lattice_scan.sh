#!/bin/bash

ALIST="5.36 5.38 5.40 5.42 5.44 5.46 5.48 5.50 5.52"

RESULTS="lattice_scan.dat"

echo "# Si PBEsol lattice-constant scan" > "$RESULTS"
echo "# k-grid = 10x10x10, MeshCutoff = 200 Ry" >> "$RESULTS"
echo "# a_cubic(Ang)   LatticeConstant(Ang)   TotalEnergy(eV)" >> "$RESULTS"

for A in $ALIST
do

    # Our dimensionless primitive vectors require:
    # LatticeConstant = a_cubic / 2
    LC=$(awk -v a="$A" 'BEGIN {printf "%.10f", a/2.0}')

    TAG=$(echo "$A" | tr '.' '_')
    DIR="a_${TAG}"

    mkdir -p "$DIR"
    cp Si.psml "$DIR/"

    sed "s/LATTICE/${LC}/g" \
        si_lattice_template.fdf > "$DIR/si.fdf"

    echo
    echo "=========================================="
    echo " a_cubic        = ${A} Ang"
    echo " LatticeConstant = ${LC} Ang"
    echo "=========================================="

    (
        cd "$DIR" || exit 1

        rm -f Si.DM

        mpirun -np 4 siesta \
            < si.fdf > si.out
    )

    if [[ $? -ne 0 ]]; then
        echo "ERROR: SIESTA failed for a = ${A} Ang"
        exit 1
    fi

    ENERGY=$(grep "siesta:         Total =" \
        "$DIR/si.out" | tail -1 | awk '{print $4}')

    if [[ -z "$ENERGY" ]]; then
        echo "ERROR: Could not extract energy for a = ${A} Ang"
        exit 1
    fi

    printf "%-12s %-20s %18.9f\n" \
        "$A" "$LC" "$ENERGY" >> "$RESULTS"

    echo "Energy = ${ENERGY} eV"

done

echo
echo "=========================================="
echo " LATTICE-SCAN RESULTS"
echo "=========================================="

cat "$RESULTS"
