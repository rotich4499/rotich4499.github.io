#!/usr/bin/env python3
"""! @file read_results.py
@brief Extract reported values from completed SIESTA text outputs.

Uses only the Python standard library. This checks electronic convergence and
normal termination; it does not certify basis, grid, or geometry convergence.
"""
import argparse
import json
from pathlib import Path
import re

NUMBER = r"[-+]?(?:\d+\.?\d*|\.\d+)(?:[EeDd][-+]?\d+)?"


def last_number(text, pattern):
    """! @brief Return the last matching number, or None.
    @param text SIESTA output text.
    @param pattern Regular expression containing one numeric capture.
    @return Floating-point value, with Fortran D exponents supported.
    """
    matches = re.findall(pattern, text, re.MULTILINE)
    return float(matches[-1].replace("D", "E").replace("d", "e")) if matches else None


def read_result(path):
    """! @brief Read final reported energy and diagnostic quantities.
    @param path Path to a SIESTA output file.
    @return Dictionary of values and explicit completion flags.
    @exception ValueError Raised for an incomplete or electronically unconverged run.
    """
    text = Path(path).read_text(errors="replace")
    energy = last_number(text, rf"^siesta:\s+Total\s*=\s*({NUMBER})")
    scf_converged = "SCF cycle converged after" in text
    completed = bool(re.search(r"^Job completed\s*$", text, re.MULTILINE))
    if energy is None or not scf_converged or not completed:
        raise ValueError(f"{path}: final energy, SCF convergence, or normal termination is missing")
    versions = re.findall(r"^Version\s*:\s*(.+)$", text, re.MULTILINE)
    return {
        "file": str(path), "version": versions[0].strip() if versions else "not reported",
        "energy_ev_per_cell": energy,
        "fermi_ev": last_number(text, rf"^siesta:\s+Fermi\s*=\s*({NUMBER})"),
        "maximum_force_ev_per_ang": last_number(text, rf"^\s+Max\s+({NUMBER})\s*$"),
        "pressure_kbar": last_number(text, rf"^siesta:\s+Pressure \(static\):\s*({NUMBER})\s+kBar"),
        "cell_volume_ang3": last_number(text, rf"^siesta:\s+Cell volume\s*=\s*({NUMBER})"),
        "scf_converged": scf_converged, "job_completed": completed,
    }


def main():
    """! @brief Read a file and print a JSON summary or its final energy."""
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("output", type=Path)
    parser.add_argument("--energy", action="store_true", help="Print only final eV/cell")
    args = parser.parse_args()
    try:
        result = read_result(args.output)
    except (ValueError, OSError) as error:
        parser.exit(1, str(error) + "\n")
    print(f"{result['energy_ev_per_cell']:.9f}" if args.energy else json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
