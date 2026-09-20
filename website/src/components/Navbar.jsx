import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-500/10 bg-[#050807]/90 backdrop-blur-xl">
      <nav className="relative mx-auto flex h-16 max-w-7xl items-center px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-1.5"
        >
          <img
            src="/maya-agent-logo.png"
            alt="Maya-Agent"
            className="h-8 w-8 object-contain"
          />

          <span className="font-display text-lg font-bold tracking-tight text-white">
            Maya-Agent
          </span>
        </Link>

        {/* Desktop Navigation - truly centered */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex">

          <Link
            to="/docs"
            className="font-display text-sm font-medium text-white/60 transition-colors hover:text-emerald-400"
          >
            Docs
          </Link>

          <a
            href="https://github.com/SumanX08/Maya-Agent"
            target="_blank"
            rel="noreferrer"
            className="font-display text-sm font-medium text-white/60 transition-colors hover:text-emerald-400"
          >
            GitHub
          </a>

          <a
            href="https://www.npmjs.com/package/maya-agent"
            target="_blank"
            rel="noreferrer"
            className="font-display text-sm font-medium text-white/60 transition-colors hover:text-emerald-400"
          >
            npm
          </a>

        </div>

        {/* Get Started */}
        <Link
          to="/docs"
          className="ml-auto hidden items-center gap-2 rounded-lg bg-[#22c55e] px-5 py-2.5 font-display text-sm font-semibold text-[#04110b] transition hover:bg-emerald-300 md:flex"
        >
          Get Started
          <ArrowUpRight size={15} />
        </Link>

        {/* Mobile Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="ml-auto text-white md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-emerald-500/10 bg-[#050807] px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">

            <Link
              to="/docs"
              onClick={() => setMenuOpen(false)}
              className="font-display text-white/70 transition hover:text-emerald-400"
            >
              Docs
            </Link>

            <a
              href="https://github.com/SumanX08/Maya-Agent"
              target="_blank"
              rel="noreferrer"
              className="font-display text-white/70 transition hover:text-emerald-400"
            >
              GitHub
            </a>

            <a
              href="https://www.npmjs.com/package/maya-agent"
              target="_blank"
              rel="noreferrer"
              className="font-display text-white/70 transition hover:text-emerald-400"
            >
              npm
            </a>

            <Link
              to="/docs"
              onClick={() => setMenuOpen(false)}
              className="flex w-fit items-center gap-2 rounded-lg bg-emerald-400 px-5 py-3 font-display font-semibold text-[#04110b]"
            >
              Get Started
              <ArrowUpRight size={16} />
            </Link>

          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;