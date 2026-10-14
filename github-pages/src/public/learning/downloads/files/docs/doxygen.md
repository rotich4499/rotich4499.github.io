# Document the scripts with Doxygen

Doxygen can turn documented Python, C++, Fortran and Markdown into navigable HTML reference pages. This first exercise documents the teaching output reader and convergence launcher. It complements the learning pages by explaining how the utilities work.

## 1. Install and verify

On your Ubuntu computer:

```bash
sudo apt update
sudo apt install -y doxygen graphviz
doxygen --version
dot -V
```

Graphviz provides `dot` for supported diagrams. It does not create a scientifically meaningful workflow graph automatically from arbitrary shell commands.

## 2. Inspect the documented Python function

Open `scripts/read_results.py`. Its comments use the Doxygen-aware Python docstring form:

```python
def read_result(path):
    """! @brief Read final reported energy and diagnostic quantities.
    @param path Path to a SIESTA output file.
    @return Dictionary of values and explicit completion flags.
    @exception ValueError Raised for an incomplete or electronically unconverged run.
    """
```

The code does not change when explanatory comments are added. Describe the function's actual behaviour, inputs, output units and failure conditions. Avoid documenting an assumed capability the script does not implement.

## 3. Use the supplied configuration

From the extracted course root:

```bash
doxygen doxygen/Doxyfile
```

The prepared configuration points to the Python scripts, a code overview and the shell-usage page. It writes HTML to `doxygen-output/html/` and does not generate LaTeX output.

| Doxyfile setting | Purpose |
| --- | --- |
| INPUT | Files to document |
| USE_MDFILE_AS_MAINPAGE | Use the code overview as the landing page |
| SOURCE_BROWSER | Link to source listings |
| GENERATE_HTML | Produce the HTML reference |
| OUTPUT_DIRECTORY | Keep generated files in a separate folder |
| EXAMPLE_PATH | Find the shell launcher used as an example |
| HAVE_DOT | Allow supported Graphviz diagrams |

To explore a fresh default configuration in a separate folder, `doxygen -g Doxyfile` generates one. The supplied short configuration is easier to review for this first exercise.

## 4. Open and inspect the result

```bash
xdg-open doxygen-output/html/index.html
```

You should find the main page, file listings, Python function descriptions and a shell-launcher usage page. Inspect warnings: broken links, missing files or comments attached to the wrong function need correction before publication.

## 5. Understand the shell-script limit

Doxygen does not include a native Bash parser among its supported source-language parsers. The course therefore documents the shell launcher using `doxygen/shell-usage.dox`, with a usage explanation and included source listing. That provides useful readable reference without claiming automatic Bash call graphs.

Python function documentation can be generated directly. More advanced Python analysis and shell-specific documentation tooling can be evaluated later if the script collection grows.

## 6. Connect it to the learning website

Keep Markdown tutorials and original source code as the editable material. Regenerate Doxygen HTML when documented code changes, then publish the generated reference together with the course or under a dedicated code-reference path.

The current draft includes the configuration and a guided exercise. Doxygen HTML has not been generated in this environment, where the Doxygen executable is unavailable. Once you run the commands above and provide the generated output or warnings, we can inspect it and connect the verified HTML reference.

Official reading: [Doxygen getting started](https://www.doxygen.nl/manual/starting.html), [Python documentation comments](https://www.doxygen.nl/manual/docblocks.html), [configuration reference](https://www.doxygen.nl/manual/config.html), and [Markdown support](https://www.doxygen.nl/manual/markdown.html).
