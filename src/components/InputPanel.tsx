import InputField from "./InputField";
import { useFormValidation } from "@/hooks/useFormValidation";

const FIELD_CONFIGS = [
  // Group A: Transit Observational Parameters
  { name: "koi_period", label: "Orbital Period", tooltip: "Time for the planet to complete one orbit around its host star (days)", placeholder: "e.g. 9.4884", type: "float" as const, min: 0.001, required: true, group: "A" },
  { name: "koi_duration", label: "Transit Duration", tooltip: "Duration of the planetary transit in hours", placeholder: "e.g. 2.9575", type: "float" as const, min: 0.001, required: false, group: "A" },
  { name: "koi_depth", label: "Transit Depth", tooltip: "Fractional flux decrease during transit (ppm)", placeholder: "e.g. 615.8", type: "float" as const, min: 0.001, required: true, group: "A" },
  { name: "koi_impact", label: "Impact Parameter", tooltip: "Projected distance between planet and star centers during transit (0–1.5)", placeholder: "e.g. 0.146", type: "float" as const, min: 0, max: 1.5, required: true, group: "A" },
  { name: "koi_model_snr", label: "Model SNR", tooltip: "Signal-to-noise ratio of the transit model fit", placeholder: "e.g. 35.8", type: "float" as const, required: true, group: "A" },
  { name: "koi_num_transits", label: "Number of Transits", tooltip: "Number of observed transits", placeholder: "e.g. 142", type: "float" as const, required: false, group: "A" },
  { name: "koi_ror", label: "Planet-Star Radius Ratio", tooltip: "Ratio of planet radius to star radius", placeholder: "e.g. 0.022", type: "float" as const, required: true, group: "A" },

  // Group B: Host Star Properties
  { name: "st_teff", label: "Stellar Effective Temp", tooltip: "Surface temperature of the host star (Kelvin)", placeholder: "e.g. 5762", type: "float" as const, required: false, group: "B" },
  { name: "st_logg", label: "Stellar Surface Gravity", tooltip: "Log surface gravity of the host star (log g, cgs)", placeholder: "e.g. 4.426", type: "float" as const, required: false, group: "B" },
  { name: "st_met", label: "Stellar Metallicity", tooltip: "Metallicity of the host star", placeholder: "e.g. 0.14", type: "float" as const, required: false, group: "B" },
  { name: "st_mass", label: "Stellar Mass", tooltip: "Mass of the host star in Solar masses", placeholder: "e.g. 0.985", type: "float" as const, required: true, group: "B" },
  { name: "st_radius", label: "Stellar Radius", tooltip: "Radius of the host star in Solar radii", placeholder: "e.g. 0.989", type: "float" as const, required: true, group: "B" },
  { name: "st_dens", label: "Stellar Density", tooltip: "Mean stellar density (g/cm³)", placeholder: "e.g. 1.469", type: "float" as const, required: true, group: "B" },

  // Group C: Errors
  { name: "teff_err1", label: "Teff Error (+)", tooltip: "Upper error for Teff", placeholder: "e.g. 123", type: "float" as const, required: true, group: "C" },
  { name: "teff_err2", label: "Teff Error (-)", tooltip: "Lower error for Teff", placeholder: "e.g. -123", type: "float" as const, required: false, group: "C" },
  { name: "logg_err1", label: "Logg Error (+)", tooltip: "Upper error for Logg", placeholder: "e.g. 0.068", type: "float" as const, required: false, group: "C" },
  { name: "logg_err2", label: "Logg Error (-)", tooltip: "Lower error for Logg", placeholder: "e.g. -0.243", type: "float" as const, required: false, group: "C" },
  { name: "feh_err1", label: "Metallicity Error (+)", tooltip: "Upper error for Metallicity", placeholder: "e.g. 0.15", type: "float" as const, required: false, group: "C" },
  { name: "feh_err2", label: "Metallicity Error (-)", tooltip: "Lower error for Metallicity", placeholder: "e.g. -0.15", type: "float" as const, required: true, group: "C" },
  { name: "mass_err1", label: "Mass Error (+)", tooltip: "Upper error for Stellar Mass", placeholder: "e.g. 0.1315", type: "float" as const, required: false, group: "C" },
  { name: "mass_err2", label: "Mass Error (-)", tooltip: "Lower error for Stellar Mass", placeholder: "e.g. -0.08685", type: "float" as const, required: true, group: "C" },
  { name: "radius_err1", label: "Radius Error (+)", tooltip: "Upper error for Stellar Radius", placeholder: "e.g. 0.465", type: "float" as const, required: false, group: "C" },
  { name: "radius_err2", label: "Radius Error (-)", tooltip: "Lower error for Stellar Radius", placeholder: "e.g. -0.114", type: "float" as const, required: true, group: "C" },
];

interface InputPanelProps {
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
  onValidateAll: () => boolean;
  errors: Record<string, string>;
  onFieldValidate: (name: string, value: string) => void;
}

const groupLabels: Record<string, string> = {
  A: "Transit Observational Parameters",
  B: "Signal Quality Metrics",
  C: "Host Star Properties",
};

const InputPanel = ({ values, onChange, onValidateAll, errors, onFieldValidate }: InputPanelProps) => {
  const groups = ["A", "B", "C"];

  const handleChange = (name: string, value: string) => {
    onChange(name, value);
    onFieldValidate(name, value);
  };

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="font-display text-lg tracking-widest uppercase text-foreground mb-6">
        Signal Parameters
      </h2>
      {groups.map((g) => (
        <div key={g} className="mb-8">
          <h3 className="font-body text-xs tracking-widest uppercase text-secondary mb-4">
            Group {g} — {groupLabels[g]}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FIELD_CONFIGS.filter((f) => f.group === g).map((field) => (
              <div key={field.name} className="glass-card rounded-lg p-4">
                <InputField
                  name={field.name}
                  label={field.label}
                  tooltip={field.tooltip}
                  placeholder={field.placeholder}
                  value={values[field.name] || ""}
                  onChange={handleChange}
                  error={errors[field.name]}
                  type={field.type === "string" ? "text" : "number"}
                  isOutput={field.isOutput}
                  disabled={field.isOutput}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={onValidateAll}
        className="font-display text-xs tracking-widest uppercase px-6 py-2 rounded border border-primary/50 text-primary hover:bg-primary/10 transition-colors"
      >
        Validate All
      </button>
    </section>
  );
};

export { FIELD_CONFIGS };
export default InputPanel;
