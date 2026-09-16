export default function Footer() {
  return (
    <footer className="border-t border-emerald-500/10 bg-[#050807] px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center">
  <img
    src="/maya-agent-logo.png"
    alt="Maya-Agent"
    className="h-10  w-10 object-contain"
  />
</div>

          <span className="font-semibold text-slate-300">
            Maya-Agent
          </span>

          <span className="font-mono text-xs text-slate-600">
            Open Source · MIT
          </span>
        </div>

        <div className="flex items-center gap-6 font-mono text-xs text-slate-500">
          <a href="#" className="transition hover:text-emerald-400">
            Documentation
          </a>

          <a href="https://github.com/SumanX08/Maya-Agent" className="transition hover:text-emerald-400">
            GitHub
          </a>

          <a href="https://www.npmjs.com/package/maya-agent" className="transition hover:text-emerald-400">
            npm
          </a>

          <span>Built with JavaScript</span>
        </div>
      </div>
    </footer>
  );
}