#!/usr/bin/env bash
# Run from anywhere: bash scripts/run_calculation.sh scf 4
# Arguments: calculation (scf|relaxation), optional MPI process count.
# Inputs are copied into a fresh directory; existing runs are preserved.
set -euo pipefail

COURSE_ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
CALCULATION="${1:-scf}"
MPI_PROCESSES="${2:-4}"
SIESTA_EXE="${SIESTA_EXE:-siesta}"
case "$CALCULATION" in
  scf) INPUT_NAME=si_scf.fdf ;;
  relaxation) INPUT_NAME=si_relax.fdf ;;
  *) printf 'Use scf or relaxation as the first argument.\n' >&2; exit 2 ;;
esac
if ! [[ "$MPI_PROCESSES" =~ ^[1-9][0-9]*$ ]]; then
  printf 'MPI process count must be a positive integer.\n' >&2; exit 2
fi
command -v "$SIESTA_EXE" >/dev/null
command -v mpirun >/dev/null
mkdir -p "$COURSE_ROOT/runs"
RUN_DIR="$(mktemp -d "$COURSE_ROOT/runs/${CALCULATION}-XXXXXX")"
cp "$COURSE_ROOT/examples/silicon-diamond/$CALCULATION/$INPUT_NAME" "$RUN_DIR/si.fdf"
cp "$COURSE_ROOT/examples/silicon-diamond/pseudopotentials/Si.psml" "$RUN_DIR/"
export OMP_NUM_THREADS=1
export OPENBLAS_NUM_THREADS=1
printf 'Running in %s\n' "$RUN_DIR"
cd "$RUN_DIR"
mpirun -np "$MPI_PROCESSES" "$SIESTA_EXE" < si.fdf > si.out 2> si.err
python3 "$COURSE_ROOT/scripts/read_results.py" si.out
printf 'Output: %s/si.out\n' "$RUN_DIR"
