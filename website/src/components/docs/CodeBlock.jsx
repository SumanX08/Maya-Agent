import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CodeBlock({ children }) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(String(children));
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <div className="relative my-6 overflow-hidden rounded-xl border border-emerald-500/15 bg-[#080d0b]">
      <button
        onClick={copyCode}
        aria-label="Copy code"
        className="absolute right-3 top-3 rounded-md border border-white/10 p-2 text-slate-500 transition hover:text-emerald-400"
      >
        {copied ? <Check size={15} /> : <Copy size={15} />}
      </button>

      <pre className="overflow-x-auto p-5 pr-14 font-mono text-sm leading-7 text-slate-300">
        <code>{children}</code>
      </pre>
    </div>
  );
}