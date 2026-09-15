import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CoreArchitecture from "./components/CoreArchitecture";
import AgentFlow from "./components/AgentFlow";
import GraphMemory from "./components/GraphMemory";
import ModelProviders from "./components/ModelProviders";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

import Docs from "./pages/Docs";

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#060a09] text-white">
      <Navbar />

      <main>
        <Hero />
        <CoreArchitecture />
        <AgentFlow />
        <GraphMemory />
        <ModelProviders />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/docs/*" element={<Docs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;