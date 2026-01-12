export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}
