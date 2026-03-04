import { motion } from "framer-motion";
import { PredictionResult } from "@/utils/api";

interface ResultsPanelProps {
  result: PredictionResult;
}

const ResultsPanel = ({ result }: ResultsPanelProps) => {
  const isConfirmed = result.disposition === "CONFIRMED";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="glass-card rounded-lg p-8 text-center">
        <h2 className="font-display text-2xl tracking-widest uppercase text-foreground mb-8">
          Model Prediction
        </h2>

        <div className="space-y-4">
          <div>
            <span className="font-body text-sm text-muted-foreground mr-2">Predicted Radius:</span>
            <span className="font-display text-lg text-foreground">
              {result.predicted_radius.toFixed(2)} Earth Radii
            </span>
          </div>

          <div>
            <span className="font-body text-sm text-muted-foreground mr-2">Class:</span>
            <span
              className={`font-display text-lg ${isConfirmed ? "text-success" : "text-destructive"
                }`}
            >
              {isConfirmed ? "Confirmed" : "False Positive"}
            </span>
          </div>

          <div>
            <span className="font-body text-sm text-muted-foreground mr-2">Confidence:</span>
            <span className="font-display text-lg text-foreground">
              {(result.confidence * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ResultsPanel;
