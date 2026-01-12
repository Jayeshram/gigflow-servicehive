export default function Loading({ text = "Loading..." }) {
  return (
    <div className="w-full grid place-items-center py-14">
      <div className="flex items-center gap-3">
        <div className="h-5 w-5 rounded-full border-2 border-gray-300 border-t-transparent animate-spin" />
        <p className="text-gray-700 font-semibold">{text}</p>
      </div>
    </div>
  );
}
