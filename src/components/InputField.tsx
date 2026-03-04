import { useState } from "react";

interface InputFieldProps {
  name: string;
  label: string;
  tooltip: string;
  placeholder: string;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  type?: "text" | "number";
  disabled?: boolean;
  isOutput?: boolean;
}

const InputField = ({
  name,
  label,
  tooltip,
  placeholder,
  value,
  onChange,
  error,
  type = "number",
  disabled = false,
  isOutput = false,
}: InputFieldProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className={`relative ${isOutput ? "opacity-60" : ""}`}>
      <div className="flex items-center gap-2 mb-1.5">
        <label className="text-xs font-body font-semibold tracking-widest uppercase text-primary">
          {label}
        </label>
        <div className="relative">
          <button
            type="button"
            className="w-4 h-4 rounded-full border border-muted-foreground text-muted-foreground text-[10px] flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
          >
            i
          </button>
          {showTooltip && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 w-56 p-2 rounded-md glass-card border border-primary/30 text-xs text-foreground font-body shadow-lg">
              {tooltip}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary/30" />
            </div>
          )}
        </div>
        {isOutput && (
          <span className="text-[10px] font-body text-secondary uppercase tracking-wider ml-auto">
            OUTPUT
          </span>
        )}
      </div>
      <input
        type={type === "number" ? "text" : type}
        inputMode={type === "number" ? "decimal" : undefined}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full bg-accent/50 border border-border rounded-md px-3 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none transition-all input-stellar ${
          error ? "input-error" : ""
        } ${disabled ? "cursor-not-allowed" : ""}`}
      />
      {error && (
        <p className="text-xs font-body italic text-destructive mt-1">{error}</p>
      )}
    </div>
  );
};

export default InputField;
