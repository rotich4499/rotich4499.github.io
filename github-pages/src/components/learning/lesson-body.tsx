"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export type LessonBlock = { kind: string; html?: string; code?: string; language?: string };

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [status, setStatus] = useState("Copy");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("Copied");
      window.setTimeout(() => setStatus("Copy"), 1800);
    } catch {
      setStatus("Select and copy below");
    }
  };
  return <div className="lesson-code">
    <div className="lesson-code-bar"><span>{language === "bash" ? "Terminal · Bash" : language === "python" ? "Python" : "Input / output"}</span>
      <Button variant="ghost" size="sm" className="code-copy" onClick={copy} aria-label="Copy this code block">{status}</Button>
    </div>
    <pre tabIndex={0}><code>{code}</code></pre>
    <span className="sr-only" aria-live="polite">{status === "Copied" ? "Code copied to clipboard" : ""}</span>
  </div>;
}

export function LessonBody({ blocks }: { blocks: LessonBlock[] }) {
  return <div className="lesson-content">{blocks.map((block, index) =>
    block.kind === "code" ? <CodeBlock key={index} code={block.code ?? ""} language={block.language ?? "text"} /> :
    <div key={index} dangerouslySetInnerHTML={{ __html: block.html ?? "" }} />
  )}</div>;
}
