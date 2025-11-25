export default function Toggle({
  label,
  checked,
  onChange,
  helperText,
  className = "",
}) {
  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition ${
          checked ? "bg-accent-orange" : "bg-gray-200"
        }`}
        aria-pressed={checked}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
      <div>
        <p className="text-sm font-medium text-gray-700">{label}</p>
        {helperText && (
          <p className="text-xs text-gray-500 mt-0.5">{helperText}</p>
        )}
      </div>
    </div>
  );
}
