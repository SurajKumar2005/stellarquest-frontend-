import { useState, useEffect, useCallback } from "react";
import StarField from "@/components/StarField";
import HeroSection from "@/components/HeroSection";
import InputPanel, { FIELD_CONFIGS } from "@/components/InputPanel";
import PredictButton from "@/components/PredictButton";
import ResultsPanel from "@/components/ResultsPanel";
import ChartSection from "@/components/ChartSection";
import PredictionLog from "@/components/PredictionLog";
import Footer from "@/components/Footer";
import { predictExoplanet, PredictionResult } from "@/utils/api";
import { useFormValidation } from "@/hooks/useFormValidation";

const validationFields = FIELD_CONFIGS.filter((f) => !f.isOutput).map((f) => ({
  name: f.name,
  type: f.type,
  min: f.min,
  max: f.max,
  required: f.required,
}));

const Index = () => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshHistoryTrigger, setRefreshHistoryTrigger] = useState(0);

  const { errors, validateSingle, validateAll, isAllValid } = useFormValidation(validationFields);

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleValidateAll = useCallback(() => {
    return validateAll(values);
  }, [values, validateAll]);

  const valid = isAllValid(values);

  const handlePredict = async () => {
    if (!handleValidateAll()) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await predictExoplanet(values);
      setResult(res);
      // Trigger the history table to fetch the newest data from the DB
      setRefreshHistoryTrigger((prev) => prev + 1);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Prediction failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <StarField />
      <HeroSection />
      <InputPanel
        values={values}
        onChange={handleChange}
        onValidateAll={handleValidateAll}
        errors={errors}
        onFieldValidate={(name, value) => validateSingle(name, value)}
      />
      <PredictButton isValid={valid} isLoading={isLoading} onClick={handlePredict} />
      {error && (
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-destructive/20 border border-destructive/30 rounded-lg p-4 text-destructive font-body text-sm">
            {error}
          </div>
        </div>
      )}
      {result && (
        <>
          <ResultsPanel result={result} />
          <ChartSection result={result} />
        </>
      )}
      <PredictionLog refreshTrigger={refreshHistoryTrigger} />
      <Footer />
    </div>
  );
};

export default Index;
