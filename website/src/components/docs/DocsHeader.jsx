import {
  ArrowLeft,
  ExternalLink,
  
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function DocsHeader({
  mobileOpen,
  setMobileOpen,
}) {
  return (
    <header className="sticky top-0 z-50 h-18 border-b border-white/[0.07] bg-[#050807]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-375 items-center justify-between px-5 md:px-8">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 text-slate-500 transition hover:border-emerald-500/30 hover:text-emerald-400 lg:hidden"
            aria-label="Toggle documentation menu"
          >
            {mobileOpen ? (
              <X size={17} />
            ) : (
              <Menu size={17} />
            )}
          </button>

          <Link
            to="/"
            className="group flex items-center gap-3"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/25 bg-emerald-500/6 transition group-hover:border-emerald-400/40 group-hover:bg-emerald-500/10">
              <span className="font-mono text-sm font-bold text-emerald-400">
                M
              </span>
            </div>

            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-semibold tracking-tight text-white">
                  Maya-Agent
                </span>

                <span className="rounded-md border border-white/8 bg-white/2.5 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-slate-600">
                  Docs
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Center breadcrumb */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs md:flex">
          <span className="text-slate-700">
            maya-agent
          </span>

          <span className="text-slate-800">/</span>

          <span className="text-slate-500">
            documentation
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/SumanX08/Maya-Agent"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-lg border border-white/[0.07] bg-white/1.5 px-3 py-2 text-xs font-medium text-slate-500 transition hover:border-white/12 hover:text-white sm:flex"
          >
            <X size={14} />
            <span>GitHub</span>
          </a>

          <a
            href="https://www.npmjs.com/package/maya-agent"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/6 px-3 py-2 text-xs font-medium text-emerald-400 transition hover:border-emerald-500/35 hover:bg-emerald-500/10"
          >
            <span>npm</span>
            <ExternalLink size={12} />
          </a>

          <Link
            to="/"
            className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 transition hover:text-slate-300 lg:flex"
          >
            <ArrowLeft size={13} />
            Home
          </Link>
        </div>
      </div>
    </header>
  );
}