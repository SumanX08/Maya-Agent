import { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";

export default function CodeBlock({
  children,
  language = "javascript",
}) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(children);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      // Clipboard may be unavailable in some environments.
    }
  };

  return (
    <div className="my-7 overflow-hidden rounded-xl border border-white/8 bg-[#080d0b] shadow-2xl shadow-black/20">
      {/* Header */}
      <div className="flex h-11 items-center justify-between border-b border-white/6 bg-white/1.5 px-4">
        <div className="flex items-center gap-2">
          <Terminal size={13} className="text-emerald-500/70" />

          <span className="font-mono text-[11px] uppercase tracking-wider text-slate-600">
            {language}
          </span>
        </div>

        <button
          onClick={copyCode}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-slate-600 transition hover:bg-white/5 hover:text-emerald-400"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check size={13} />
              <span className="text-[11px]">Copied</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span className="text-[11px]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7 text-slate-300">
        <code>{children}</code>
      </pre>
    </div>
  );
}