export default function MultiSelectCheckbox({
  label,
  options = [],
  values = [],
  onChange,
  className = "",
  max = null,
}) {
  const toggleValue = (value) => {
    let newValues = [...values];
    if (newValues.includes(value)) {
      newValues = newValues.filter((v) => v !== value);
    } else {
      if (max && newValues.length >= max) return;
      newValues.push(value);
    }
    onChange(newValues);
  };

  return (
    <div className={`w-full ${className}`}>
      <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((opt) => (
          <label
            key={opt}
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <input
              type="checkbox"
              checked={values.includes(opt)}
              onChange={() => toggleValue(opt)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
