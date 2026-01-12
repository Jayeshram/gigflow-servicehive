export default function PageWrapper({
  title,
  subtitle,
  icon,
  accent = "blue",
  children,
}) {
  const accentMap = {
    blue: "from-blue-600 to-indigo-600",
    purple: "from-purple-600 to-pink-600",
    green: "from-green-600 to-emerald-600",
    orange: "from-orange-600 to-amber-600",
    slate: "from-slate-700 to-gray-900",
    red: "from-red-600 to-rose-600",
  };

  return (
    <div className="min-h-[80vh]">
      {/* ✅ Header */}
      <div className={`rounded-3xl p-6 mb-6 shadow-sm bg-gradient-to-r ${accentMap[accent]}`}>
        <div className="flex items-center gap-3 text-white">
          <div className="h-12 w-12 rounded-2xl bg-white/15 grid place-items-center text-2xl">
            {icon}
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold">{title}</h1>
            <p className="text-white/80 text-sm md:text-base">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* ✅ Content */}
      <div>{children}</div>
    </div>
  );
}
