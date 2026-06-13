export default function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="h-52 skeleton-shimmer" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="h-3 w-16 rounded-full skeleton-shimmer" />
          <div className="h-3 w-12 rounded-full skeleton-shimmer" />
        </div>
        <div className="h-4 w-3/4 rounded-lg skeleton-shimmer" />
        <div className="h-3 w-full rounded-lg skeleton-shimmer" />
        <div className="h-3 w-4/5 rounded-lg skeleton-shimmer" />
        <div className="h-3 w-24 rounded-lg skeleton-shimmer" />
        <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="h-7 w-20 rounded-lg skeleton-shimmer" />
          <div className="h-9 w-28 rounded-xl skeleton-shimmer" />
        </div>
      </div>
    </div>
  )
}
