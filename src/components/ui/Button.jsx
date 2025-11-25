export default function Button({
  children,
  variant = "primary",
  className = "",
  disabled = false,
  type = "button",
  ...rest
}) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary";

  const variantClasses =
    variant === "secondary"
      ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
      : "bg-primary text-white hover:bg-primary/90";

  const disabledClasses = disabled
    ? " opacity-50 cursor-not-allowed"
    : "";

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
