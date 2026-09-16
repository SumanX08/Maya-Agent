import { ArrowUpRight } from "lucide-react";

export default function FeatureCard({ title, children }) {
  return (
    <div
      className="feature-card group relative mt-5 overflow-hidden rounded-xl p-5 transition duration-300"
      style={{
        border: "1px solid #1a2420",
        background: "#0b0f0d",
      }}
    >
      {/* subtle green glow */}
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-24 w-24 rounded-full blur-2xl transition duration-500"
        style={{ background: "rgba(34,197,94,0.05)" }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <h3
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              fontSize: "0.88rem",
              color: "#d4dfe8",
              marginBottom: "4px",
            }}
          >
            {title}
          </h3>

          <p
            style={{
              fontSize: "0.76rem",
              color: "#3d5a44",
              lineHeight: 1.6,
            }}
          >
            {children}
          </p>
        </div>

        <ArrowUpRight
          size={16}
          className="shrink-0 transition-colors duration-300"
          style={{ color: "#2d4a35" }}
        />
      </div>
    </div>
  );
}