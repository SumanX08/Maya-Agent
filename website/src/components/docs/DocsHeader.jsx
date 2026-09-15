import { Menu, X, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function DocsHeader({
  mobileOpen,
  setMobileOpen,
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-emerald-500/10 bg-[#060a09]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        {/* Logo */}
        <Link
  to="/"
  className="flex items-center gap-3"
>
  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/5 font-bold text-emerald-400">
    λ
  </div>

  <span className="font-semibold">
    Maya-Agent
  </span>

  <span className="hidden font-mono text-xs text-slate-600 sm:block">
    / docs
  </span>
</Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-6 text-sm text-slate-400 md:flex">
          <Link
  to="/"
  className="flex items-center gap-2 transition hover:text-emerald-400"
>
  <ArrowLeft size={15} />
  Home
</Link>

          <a
            href="https://github.com/SumanX08/Maya-Agent"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-emerald-400"
          >
            GitHub
          </a>

          <a
            href="https://www.npmjs.com/package/maya-agent"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-emerald-400"
          >
            npm
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle documentation menu"
          className="rounded-lg border border-white/10 p-2 text-slate-300 md:hidden"
        >
          {mobileOpen ? (
            <X size={20} />
          ) : (
            <Menu size={20} />
          )}
        </button>
      </div>
    </header>
  );
}