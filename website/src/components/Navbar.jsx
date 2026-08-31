import { GitBranch, Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky  top-0 z-50 border-b border-emerald-500/10 bg-[#050807]/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-500/10 text-lg font-bold text-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.12)]">
            λ
          </div>

          <span className="text-xl font-bold tracking-tight text-white">
            Maya-Agent
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-9 md:flex">
          <a
            href="#docs"
            className="text-sm font-medium text-white/60 transition hover:text-emerald-400"
          >
        
          </a>

          <a
            href="https://github.com/SumanX08/Maya-Agent"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-white/60 transition hover:text-emerald-400"
          >
            GitHub
          </a>

          <a
            href="https://www.npmjs.com/package/maya-agent"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-white/60 transition hover:text-emerald-400"
          >
            npm
          </a>

          <a
            href="https://www.npmjs.com/package/maya-agent"
            className="flex items-center gap-2 rounded-lg bg-emerald-400 px-5 py-3 text-sm font-semibold text-[#04110b] transition hover:bg-emerald-300"
          >
            Get Started
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-emerald-500/10 bg-[#050807] px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            <a
              href="#docs"
              onClick={() => setMenuOpen(false)}
              className="text-white/70"
            >
              Docs
            </a>

            <a
              href="https://github.com/SumanX08/Maya-Agent"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-white/70"
            >
              GitHub
              <GitBranch size={16} />
            </a>

            <a
              href="https://www.npmjs.com/package/maya-agent"
              target="_blank"
              rel="noreferrer"
              className="text-white/70"
            >
              npm
            </a>

            <a
              href="#get-started"
              onClick={() => setMenuOpen(false)}
              className="flex w-fit items-center gap-2 rounded-lg bg-emerald-400 px-5 py-3 font-semibold text-[#04110b]"
            >
              Get Started
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;