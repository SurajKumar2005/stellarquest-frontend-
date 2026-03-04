import { motion } from "framer-motion";
import { PredictionResult } from "@/utils/api";
import ProbabilityChart from "./ProbabilityChart";
import RadiusChart from "./RadiusChart";
import PredictionGauge from "./PredictionGauge";
import PlanetCategoryIndicator from "./PlanetCategoryIndicator";

interface ChartSectionProps {
  result: PredictionResult;
}

const ChartSection = ({ result }: ChartSectionProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="flex flex-col gap-6">

        {/* Row 1: Gauge & Probability Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card rounded-lg p-6 flex flex-col justify-between">
            <h3 className="font-display text-xs tracking-widest uppercase text-muted-foreground mb-6 text-center">
              Confidence Gauge
            </h3>
            <div className="h-56 mt-4">
              <PredictionGauge confidence={result.confidence} />
            </div>
          </div>

          <div className="glass-card rounded-lg p-6 flex flex-col justify-between">
            <h3 className="font-display text-xs tracking-widest uppercase text-muted-foreground mb-6 text-center">
              Prediction Probability Bar
            </h3>
            <div className="h-56 mt-4">
              <ProbabilityChart confidence={result.confidence} />
            </div>
          </div>
        </div>

        {/* Row 2: Radius Comparison & Category Indicator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card rounded-lg p-6 flex flex-col justify-between">
            <h3 className="font-display text-xs tracking-widest uppercase text-muted-foreground mb-4 text-center">
              Planet Size Comparison
            </h3>
            <RadiusChart predicted={result.predicted_radius} />
          </div>

          <div className="glass-card rounded-lg p-6 flex flex-col justify-between">
            <h3 className="font-display text-xs tracking-widest uppercase text-muted-foreground mb-4 text-center">
              Planet Type Indicator
            </h3>
            <PlanetCategoryIndicator radius={result.predicted_radius} />
          </div>
        </div>

      </div>
    </motion.section>
  );
};

export default ChartSection;
