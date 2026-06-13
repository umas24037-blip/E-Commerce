import { useRef, useState } from 'react'
import { X, ShoppingCart, Heart, Star, CheckCircle, Truck, Shield, RotateCcw } from 'lucide-react'
import { useCart, useWishlist } from '../context/AppContext'
import { useParticles } from '../hooks/useParticles'
import { formatINR } from '../data/products'
import StarRating from './StarRating'

export default function QuickView({ product, onClose }) {
  const { addToCart } = useCart()
  const { toggle, isWished } = useWishlist()
  const burst = useParticles()
  const btnRef = useRef(null)
  const [added, setAdded] = useState(false)
  const wished = isWished(product?.id)

  if (!product) return null

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  function handleAdd() {
    addToCart(product)
    burst(btnRef.current)
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  const specs = product.specs.split(' · ')

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog" aria-modal="true" aria-label={`Quick view: ${product.name}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <X size={16} />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Image */}
          <div className="relative h-64 sm:h-full min-h-64 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {discount && (
              <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full bg-rose-500 text-white shadow">
                -{discount}% OFF
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[80vh]">
            <div>
              <span className="text-[10px] font-semibold text-brand-600 uppercase tracking-widest bg-brand-50 dark:bg-brand-600/10 px-2 py-0.5 rounded-full">
                {product.category}
              </span>
              <h2 className="mt-2 text-xl font-bold leading-snug">{product.name}</h2>
              <StarRating rating={product.rating} reviews={product.reviews} />
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{formatINR(product.price)}</span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through">{formatINR(product.originalPrice)}</span>
              )}
            </div>

            {/* Specs list */}
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Key Features</p>
              {specs.map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">{s}</span>
                </div>
              ))}
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { icon: Truck, label: 'Free Delivery' },
                { icon: Shield, label: '2yr Warranty' },
                { icon: RotateCcw, label: '30d Returns' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <Icon size={16} className="text-brand-600" />
                  <span className="text-[10px] text-slate-500 font-medium">{label}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-auto">
              <button
                ref={btnRef}
                onClick={handleAdd}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200
                  ${added
                    ? 'bg-emerald-500 text-white'
                    : 'bg-brand-600 hover:bg-brand-500 text-white hover:shadow-lg hover:shadow-brand-500/30 active:scale-95'
                  }`}
              >
                {added ? <><CheckCircle size={15} /> Added to Cart</> : <><ShoppingCart size={15} /> Add to Cart</>}
              </button>
              <button
                onClick={() => toggle(product)}
                aria-label="Toggle wishlist"
                className={`p-3 rounded-xl border transition-all duration-200 ${
                  wished
                    ? 'bg-rose-500 border-rose-500 text-white'
                    : 'border-slate-200 dark:border-slate-700 hover:border-rose-400 text-slate-500 hover:text-rose-500'
                }`}
              >
                <Heart size={18} className={wished ? 'fill-white' : ''} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
