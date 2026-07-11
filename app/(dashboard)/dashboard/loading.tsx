export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="ml-12 lg:ml-0">
          <div className="skeleton h-8 w-48" />
          <div className="skeleton h-4 w-64 mt-2" />
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <div className="skeleton h-10 w-10 rounded-xl" />
          <div className="skeleton h-10 w-10 rounded-xl" />
          <div className="skeleton h-10 w-32 rounded-xl" />
        </div>
      </div>

      <div className="px-6 pb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="skeleton h-[200px] rounded-[24px]" />
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-3">
              <div className="skeleton h-[140px] rounded-[20px]" />
              <div className="skeleton h-[140px] rounded-[20px]" />
              <div className="skeleton h-[140px] rounded-[20px]" />
              <div className="skeleton h-[140px] rounded-[20px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
