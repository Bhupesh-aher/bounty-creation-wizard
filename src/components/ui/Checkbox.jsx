export default function Checkbox({
  label,
  name,
  checked,
  onChange,
  className = "",
}) {
  return (
    <label
      className={`inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer ${className}`}
    >
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
      />
      <span>{label}</span>
    </label>
  );
}
