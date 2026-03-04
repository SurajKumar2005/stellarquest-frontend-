const CSSPlanet = () => {
  return (
    <div className="relative w-32 h-32 md:w-44 md:h-44" style={{ animation: "planet-float 4s ease-in-out infinite" }}>
      {/* Planet body */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 35% 35%, #00D4C8, #0B4A5C 50%, #050A0F 100%)",
          boxShadow: "inset -8px -8px 20px rgba(0,0,0,0.6), 0 0 40px rgba(0,212,200,0.2)",
        }}
      />
      {/* Ring */}
      <div
        className="absolute"
        style={{
          width: "180%",
          height: "40%",
          top: "30%",
          left: "-40%",
          border: "2px solid rgba(0, 212, 200, 0.3)",
          borderRadius: "50%",
          transform: "rotateX(70deg) rotateZ(-15deg)",
          animation: "planet-rotate 12s linear infinite",
        }}
      />
      {/* Ring glow */}
      <div
        className="absolute"
        style={{
          width: "180%",
          height: "40%",
          top: "30%",
          left: "-40%",
          border: "1px solid rgba(245, 166, 35, 0.15)",
          borderRadius: "50%",
          transform: "rotateX(70deg) rotateZ(-15deg)",
          filter: "blur(2px)",
          animation: "planet-rotate 12s linear infinite",
        }}
      />
    </div>
  );
};

export default CSSPlanet;
