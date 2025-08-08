import React from "react";

const Halo: React.FC = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background:
          `radial-gradient(600px 600px at 20% 10%, hsl(var(--glow-purple) / 0.25), transparent 60%),` +
          `radial-gradient(600px 600px at 80% 20%, hsl(var(--glow-orange) / 0.18), transparent 60%),` +
          `radial-gradient(800px 800px at 50% 80%, hsl(var(--glow-teal) / 0.12), transparent 60%)`,
        filter: "saturate(110%) blur(0px)",
      }}
    />
  );
};

export default Halo;
