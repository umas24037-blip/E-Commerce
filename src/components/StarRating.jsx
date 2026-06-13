import { Star } from 'lucide-react'

export default function StarRating({ rating, reviews }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map(s => (
          <Star
            key={s}
            size={12}
            className={s <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700'}
          />
        ))}
      </div>
      <span className="text-xs text-slate-500 dark:text-slate-400">
        {rating} ({reviews.toLocaleString()})
      </span>
    </div>
  )
}
