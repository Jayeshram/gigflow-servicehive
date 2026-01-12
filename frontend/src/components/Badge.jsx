export default function Badge({ children, variant = "default" }) {
  const styles =
    variant === "success"
      ? "bg-green-50 text-green-700 border-green-200"
      : variant === "danger"
      ? "bg-red-50 text-red-700 border-red-200"
      : variant === "warning"
      ? "bg-yellow-50 text-yellow-800 border-yellow-200"
      : "bg-gray-50 text-gray-700 border-gray-200";

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${styles}`}>
      {children}
    </span>
  );
}
