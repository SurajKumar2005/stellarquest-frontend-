import { useState, useCallback } from "react";

interface FieldConfig {
  name: string;
  type: "float" | "string";
  min?: number;
  max?: number;
  required?: boolean;
}

interface ValidationErrors {
  [key: string]: string;
}

export const useFormValidation = (fields: FieldConfig[]) => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateField = useCallback(
    (name: string, value: string): string => {
      const config = fields.find((f) => f.name === name);
      if (!config) return "";

      if (config.required && !value.trim()) {
        return "This field is required";
      }

      if (!value.trim()) return "";

      if (config.type === "float") {
        const num = parseFloat(value);
        if (isNaN(num)) return "Must be a valid number";
        if (config.min !== undefined && num < config.min)
          return `Must be ≥ ${config.min}`;
        if (config.max !== undefined && num > config.max)
          return `Must be ≤ ${config.max}`;
      }

      return "";
    },
    [fields]
  );

  const validateSingle = useCallback(
    (name: string, value: string) => {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
      return error;
    },
    [validateField]
  );

  const validateAll = useCallback(
    (values: Record<string, string>): boolean => {
      const newErrors: ValidationErrors = {};
      let valid = true;
      fields.forEach((field) => {
        const error = validateField(field.name, values[field.name] || "");
        if (error) valid = false;
        newErrors[field.name] = error;
      });
      setErrors(newErrors);
      return valid;
    },
    [fields, validateField]
  );

  const isAllValid = useCallback(
    (values: Record<string, string>): boolean => {
      return fields.every((field) => {
        const error = validateField(field.name, values[field.name] || "");
        return !error;
      });
    },
    [fields, validateField]
  );

  return { errors, validateSingle, validateAll, isAllValid };
};
