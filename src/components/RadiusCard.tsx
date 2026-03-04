import { PredictionResult } from "@/utils/api";

const MetricChip = ({ label, value }: { label: string; value: number }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-accent/50 border border-border">
    <span className="text-[10px] font-body uppercase tracking-wider text-muted-foreground">{label}</span>
    <span className="text-sm font-display text-foreground">{value.toFixed(2)}</span>
  </div>
);

const RadiusCard = ({ result }: { result: PredictionResult }) => (
  <div className="glass-card rounded-lg p-6 glow-amber">
    <h3 className="font-display text-xs tracking-widest uppercase text-muted-foreground mb-4">
      Predicted Planetary Radius
    </h3>
    <div className="text-center mb-4">
      <span className="font-display text-4xl md:text-5xl font-bold text-secondary">
        {result.predicted_radius.toFixed(2)}
      </span>
      <span className="font-display text-lg text-secondary/70 ml-1">R⊕</span>
    </div>
    <p className="font-body text-xs text-muted-foreground text-center mb-4">
      Dataset Reference Value:{" "}
      <span className="text-foreground">{result.reference_radius.toFixed(2)} R⊕</span>
    </p>
    <div className="flex gap-2 flex-wrap">
      <MetricChip label="RMSE" value={result.rmse} />
      <MetricChip label="MAE" value={result.mae} />
    </div>
  </div>
);

export default RadiusCard;
