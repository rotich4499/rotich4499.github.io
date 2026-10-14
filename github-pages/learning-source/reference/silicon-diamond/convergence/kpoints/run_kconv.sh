#!/bin/bash

KLIST="2 4 6 8 10 12 14"
RESULTS="kpoint_convergence.dat"

echo "# Si PBEsol k-point convergence" > "$RESULTS"
echo "# kgrid   TotalEnergy(eV)" >> "$RESULTS"

for K in $KLIST
do
    DIR="k${K}"

    mkdir -p "$DIR"
    cp Si.psml "$DIR/"

    sed "s/KGRID/${K}/g" \
        si_kconv_template.fdf > "$DIR/si.fdf"

    echo
    echo "================================"
    echo " Running ${K} x ${K} x ${K}"
    echo "================================"

    (
        cd "$DIR" || exit 1
        mpirun -np 4 siesta < si.fdf > si.out
    )

    ENERGY=$(grep "siesta:         Total =" \
        "$DIR/si.out" | tail -1 | awk '{print $4}')

    if [[ -z "$ENERGY" ]]; then
        echo "ERROR: Energy not found for K=$K"
        exit 1
    fi

    printf "%-5d %18.9f\n" "$K" "$ENERGY" >> "$RESULTS"

    echo "K = $K"
    echo "E = $ENERGY eV"
done

echo
echo "================================"
echo " K-POINT CONVERGENCE RESULTS"
echo "================================"

cat "$RESULTS"
