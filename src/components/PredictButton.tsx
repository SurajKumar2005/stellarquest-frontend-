interface PredictButtonProps {
  isValid: boolean;
  isLoading: boolean;
  onClick: () => void;
}

const PredictButton = ({ isValid, isLoading, onClick }: PredictButtonProps) => {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <button
        type="button"
        disabled={!isValid || isLoading}
        onClick={onClick}
        className={`w-full py-4 rounded-lg font-display text-sm md:text-base tracking-widest uppercase transition-all ${
          isValid && !isLoading
            ? "bg-primary text-primary-foreground pulse-glow hover:brightness-110"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-3">
            <span className="relative w-5 h-5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-primary-foreground"
                  style={{
                    animation: `orbit-spin 1s linear infinite`,
                    animationDelay: `${i * 0.33}s`,
                    top: "50%",
                    left: "50%",
                    transformOrigin: "0 -8px",
                  }}
                />
              ))}
            </span>
            Processing KOI Signal...
          </span>
        ) : (
          "⟶ INITIATE STELLAR ANALYSIS"
        )}
      </button>
    </section>
  );
};

export default PredictButton;
