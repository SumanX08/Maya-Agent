import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import DocsHeader from "../components/docs/DocsHeader";
import DocsSidebar from "../components/docs/DocsSidebar";
import DocsContent from "../components/docs/DocsContent";

import {
  docsSections,
  sectionToSlug,
  slugToSection,
} from "../data/docs";

export default function Docs() {
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const slug = location.pathname
    .replace(/^\/docs\/?/, "")
    .replace(/\/$/, "");

  const activeSection = slugToSection(slug);

  const selectSection = (section) => {
    const sectionSlug = sectionToSlug(section);

    const path =
      section === "Introduction"
        ? "/docs"
        : `/docs/${sectionSlug}`;

    setMobileOpen(false);

    navigate(path);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-[#060a09] text-white">
      <DocsHeader
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="mx-auto flex max-w-7xl">
        <DocsSidebar
          sections={docsSections}
          activeSection={activeSection}
          onSelect={selectSection}
          mobileOpen={mobileOpen}
        />

        <DocsContent
          activeSection={activeSection}
        />
      </div>
    </div>
  );
}