document.addEventListener("click", async event => {
  const button = event.target.closest?.("button.code-copy");
  if (!button) return;
  const block = button.closest(".lesson-code");
  const code = block?.querySelector("pre code");
  if (!code) return;
  const announcement = block.querySelector('[aria-live="polite"]');
  try {
    await navigator.clipboard.writeText(code.textContent);
    button.textContent = "Copied";
    if (announcement) announcement.textContent = "Code copied to clipboard";
    window.setTimeout(() => {
      button.textContent = "Copy";
      if (announcement) announcement.textContent = "";
    }, 1800);
  } catch {
    button.textContent = "Select and copy below";
    const range = document.createRange();
    range.selectNodeContents(code);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    if (announcement) announcement.textContent = "Select the code and copy it manually";
  }
});
