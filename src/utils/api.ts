export interface PredictionResult {
  disposition: "CONFIRMED" | "FALSE POSITIVE";
  confidence: number;
  predicted_radius: number;
  reference_radius: number;
  roc_auc: number;
  f1_score: number;
  rmse: number;
  mae: number;
}

const API_URL = import.meta.env.VITE_API_URL || "";

export const predictExoplanet = async (
  params: Record<string, string>
): Promise<PredictionResult> => {
  if (API_URL) {
    console.log("Sending payload:", params);

    // Convert empty strings to null for backend
    const processedParams: Record<string, any> = {};
    for (const key in params) {
      if (params[key] === "") {
        processedParams[key] = null;
      } else {
        processedParams[key] = parseFloat(params[key]);
      }
    }

    console.log("Processed payload:", processedParams);

    const res = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(processedParams),
    });
    if (!res.ok) throw new Error("Prediction API failed");

    const data = await res.json();
    return {
      disposition: data.habitability_class.toUpperCase() as "CONFIRMED" | "FALSE POSITIVE",
      confidence: data.habitability_probability,
      predicted_radius: data.predicted_planet_radius,
      reference_radius: 2.26,
      roc_auc: 0.94,
      f1_score: 0.91,
      rmse: 1.23,
      mae: 0.87,
    };
  }

  // Mock response
  return new Promise((resolve) => {
    setTimeout(() => {
      const period = parseFloat(params.koi_period) || 1;
      const isConfirmed = period > 5;
      resolve({
        disposition: isConfirmed ? "CONFIRMED" : "FALSE POSITIVE",
        confidence: isConfirmed ? 0.874 : 0.762,
        predicted_radius: 8.06,
        reference_radius: 2.26,
        roc_auc: 0.94,
        f1_score: 0.91,
        rmse: 1.23,
        mae: 0.87,
      });
    }, 2000);
  });
};

export interface HistoryResponse {
  data: Array<{
    timestamp: string;
    koi_period: number | null;
    st_teff: number | null;
    habitability_class: string;
    predicted_radius: number;
    confidence: number;
  }>;
  total: number;
  page: number;
  limit: number;
}

export const fetchPredictionHistory = async (
  page: number = 1,
  limit: number = 5
): Promise<HistoryResponse> => {
  if (API_URL) {
    const res = await fetch(`${API_URL}/history?page=${page}&limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch history");
    return await res.json();
  }

  // Mock response for no API url
  return {
    data: [],
    total: 0,
    page,
    limit
  };
};
