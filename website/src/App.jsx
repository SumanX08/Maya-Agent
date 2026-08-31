import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CoreArchitecture from "./components/CoreArchitecture";
import AgentFlow from "./components/AgentFlow";
import GraphMemory from "./components/GraphMemory";
import ModelProviders from "./components/ModelProviders";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function App() {
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

export default App;