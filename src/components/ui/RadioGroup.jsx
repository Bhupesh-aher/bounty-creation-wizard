export default function RadioGroup({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  required,
  className = "",
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <p className="text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </p>
      )}
      <div className="flex gap-6">
        {options.map((opt) => {
          const checked = value === opt.value;
          return (
            <label
              key={opt.value}
              className={`flex items-center gap-2 text-sm cursor-pointer ${
                checked ? "text-primary" : "text-gray-700"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={checked}
                onChange={(e) => onChange(e.target.value)}
                className="h-4 w-4 text-primary focus:ring-primary"
              />
              <span>{opt.label}</span>
            </label>
          );
        })}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
