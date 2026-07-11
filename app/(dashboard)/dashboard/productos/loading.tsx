export default function ProductosLoading() {
  return (
    <div className="animate-pulse px-6 pb-8">
      <div className="skeleton h-10 w-full rounded-xl mb-4" />
      <div className="flex justify-between mb-4">
        <div className="skeleton h-4 w-24" />
        <div className="skeleton h-9 w-36 rounded-xl" />
      </div>
      <div className="rounded-2xl border border-gray-100 overflow-hidden">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-4 p-4 border-b border-gray-100">
            <div className="skeleton h-10 w-10 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-40" />
              <div className="skeleton h-3 w-24" />
            </div>
            <div className="skeleton h-6 w-16 rounded-lg" />
            <div className="skeleton h-8 w-8 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
