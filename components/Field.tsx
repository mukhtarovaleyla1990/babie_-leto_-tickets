"use client";

type BaseProps = {
  label: string;
  hint?: string;
  required?: boolean;
};

export function TextField({
  label,
  hint,
  required,
  type = "text",
  value,
  onChange,
  placeholder,
  inputMode,
  autoComplete,
}: BaseProps & {
  type?: "text" | "email" | "tel" | "number";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      <input
        className="field"
        type={type}
        value={value}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

export function SelectField({
  label,
  hint,
  required,
  value,
  onChange,
  options,
  placeholder = "Выберите…",
}: BaseProps & {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      <select
        className="field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

export function TextAreaField({
  label,
  hint,
  required,
  value,
  onChange,
  placeholder,
}: BaseProps & {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      <textarea
        className="field min-h-[84px] resize-y"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}
