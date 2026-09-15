export default function DocsSidebar({
  sections,
  activeSection,
  onSelect,
  mobileOpen,
}) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-emerald-500/10 px-5 py-8 md:block">
        <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-emerald-400">
          DOCUMENTATION
        </p>

        <nav className="space-y-1">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => onSelect(section)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                activeSection === section
                  ? "bg-emerald-500/10 font-medium text-emerald-400"
                  : "text-slate-500 hover:bg-white/[0.03] hover:text-slate-200"
              }`}
            >
              {section}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-[#060a09] p-5 md:hidden">
          <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-emerald-400">
            DOCUMENTATION
          </p>

          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => onSelect(section)}
                className={`w-full rounded-lg px-3 py-3 text-left text-sm transition ${
                  activeSection === section
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {section}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}