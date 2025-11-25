export default function TextInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  required,
  type = "text",
  className = "",
  ...rest
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-3 py-2 text-sm outline-none
          ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10"
          }`}
        {...rest}
      />
      <div className="mt-1 flex justify-between text-xs">
        {helperText && (
          <p className="text-gray-400 truncate">{helperText}</p>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
