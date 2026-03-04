import { PredictionResult } from "@/utils/api";

const ConfidenceRing = ({ value }: { value: number }) => {
  const pct = value * 100;
  const circumference = 2 * Math.PI * 44;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative w-28 h-28 mx-auto">
      <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="44" fill="none" stroke="hsl(210,40%,14%)" strokeWidth="6" />
        <circle
          cx="50" cy="50" r="44" fill="none"
          stroke="hsl(177,100%,42%)"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-lg text-primary">{pct.toFixed(1)}%</span>
      </div>
    </div>
  );
};

const MetricChip = ({ label, value }: { label: string; value: number }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-accent/50 border border-border">
    <span className="text-[10px] font-body uppercase tracking-wider text-muted-foreground">{label}</span>
    <span className="text-sm font-display text-foreground">{value.toFixed(2)}</span>
  </div>
);

const ClassificationCard = ({ result }: { result: PredictionResult }) => {
  const isConfirmed = result.disposition === "CONFIRMED";
  return (
    <div className={`glass-card rounded-lg p-6 ${isConfirmed ? "glow-green" : "glow-red"}`}>
      <h3 className="font-display text-xs tracking-widest uppercase text-muted-foreground mb-4">
        Disposition Classification
      </h3>
      <div
        className={`inline-block px-4 py-2 rounded-md font-display text-sm tracking-wider mb-4 ${
          isConfirmed
            ? "bg-success/20 text-success border border-success/30"
            : "bg-destructive/20 text-destructive border border-destructive/30"
        }`}
        style={{ animation: "pulse 2s infinite" }}
      >
        {isConfirmed ? "✅ CONFIRMED EXOPLANET" : "❌ FALSE POSITIVE"}
      </div>
      <p className="font-body text-xs text-muted-foreground mb-3">Confidence Score</p>
      <ConfidenceRing value={result.confidence} />
      <div className="flex gap-2 mt-4 flex-wrap">
        <MetricChip label="ROC-AUC" value={result.roc_auc} />
        <MetricChip label="F1-Score" value={result.f1_score} />
      </div>
    </div>
  );
};

export default ClassificationCard;
