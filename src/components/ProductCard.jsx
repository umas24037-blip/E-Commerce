import { useRef, useState } from 'react'
import { ShoppingCart, Heart, Zap, Eye, GitCompare, CheckCircle } from 'lucide-react'
import { useCart, useWishlist } from '../context/AppContext'
import { useParticles } from '../hooks/useParticles'
import StarRating from './StarRating'
import { formatINR } from '../data/products'

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart()
  const { toggle, isWished } = useWishlist()
  const burst = useParticles()
  const btnRef = useRef(null)
  const [added, setAdded] = useState(false)
  const wished = isWished(product.id)

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  function handleAdd(e) {
    e.stopPropagation()
    if (!product.inStock) return
    addToCart(product)
    burst(btnRef.current)
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <article
      className="group relative flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-slate-900 hover:-translate-y-1.5 transition-all duration-300"
      aria-label={product.name}
    >
      {/* Badges row */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.badge && (
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md text-white ${
            product.badge === 'New' ? 'bg-emerald-500' :
            product.badge === 'Hot Deal' ? 'bg-rose-500' :
            product.badge === 'Trending' ? 'bg-amber-500' :
            product.badge === 'Gaming' ? 'bg-violet-600' :
            product.badge === 'Premium' ? 'bg-slate-800' :
            'bg-brand-600'
          }`}>
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-rose-500 text-white shadow-md">
            -{discount}%
          </span>
        )}
        {!product.inStock && (
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-500 text-white shadow-md">
            Out of Stock
          </span>
        )}
      </div>

      {/* Action buttons (appear on hover) */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        <button
          onClick={(e) => { e.stopPropagation(); toggle(product) }}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`p-2 rounded-full backdrop-blur-sm shadow-md transition-all duration-200 hover:scale-110 ${
            wished
              ? 'bg-rose-500 text-white'
              : 'bg-white/90 dark:bg-slate-800/90 text-slate-400 hover:text-rose-500'
          }`}
        >
          <Heart size={14} className={wished ? 'fill-white' : ''} />
        </button>
        {onQuickView && (
          <button
            onClick={(e) => { e.stopPropagation(); onQuickView(product) }}
            aria-label="Quick view"
            className="p-2 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-400 hover:text-brand-600 backdrop-blur-sm shadow-md transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
          >
            <Eye size={14} />
          </button>
        )}
      </div>

      {/* Image */}
      <div className="relative h-52 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-700 ${product.inStock ? 'group-hover:scale-110' : 'opacity-60 grayscale'}`}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-widest bg-brand-50 dark:bg-brand-600/10 px-2 py-0.5 rounded-full">
            {product.category}
          </span>
          {product.inStock && (
            <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
              In Stock
            </span>
          )}
        </div>

        <h3 className="font-semibold text-slate-900 dark:text-slate-100 leading-snug line-clamp-2 text-sm">
          {product.name}
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
          {product.specs}
        </p>

        <StarRating rating={product.rating} reviews={product.reviews} />

        {/* Price row */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-col">
            <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through leading-none mt-0.5">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            ref={btnRef}
            onClick={handleAdd}
            disabled={!product.inStock}
            aria-label={`Add ${product.name} to cart`}
            className={`relative flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 shadow-sm
              ${!product.inStock
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                : added
                  ? 'bg-emerald-500 text-white scale-95 shadow-emerald-200'
                  : 'bg-brand-600 hover:bg-brand-500 text-white hover:scale-105 hover:shadow-lg hover:shadow-brand-500/30 active:scale-95'
              }`}
          >
            {added ? (
              <><CheckCircle size={13} /> Added!</>
            ) : (
              <><ShoppingCart size={13} /> Add to Cart</>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}
