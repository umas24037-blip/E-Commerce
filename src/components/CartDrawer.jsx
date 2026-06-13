import { X, ShoppingBag, Trash2, Tag, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/AppContext'
import { formatINR } from '../data/products'

export default function CartDrawer({ open, onClose }) {
  const { items, removeFromCart, totalItems } = useCart()
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const savings  = items.reduce((s, i) => s + ((i.originalPrice || i.price) - i.price) * i.qty, 0)

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-slate-900 z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
              <ShoppingBag size={15} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold text-base leading-none">My Cart</h2>
              <p className="text-xs text-slate-400 mt-0.5">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close cart" className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-400">
              <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <ShoppingBag size={36} strokeWidth={1} />
              </div>
              <div className="text-center">
                <p className="font-semibold text-slate-600 dark:text-slate-300">Your cart is empty</p>
                <p className="text-xs mt-1">Add some products to get started</p>
              </div>
              <Link to="/shop" onClick={onClose} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-500 transition-colors">
                Browse Products <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800 group hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-xs leading-snug line-clamp-2">{item.name}</p>
                  <p className="text-xs text-slate-400 mt-1">Qty: {item.qty}</p>
                  <p className="text-sm font-bold text-brand-600 mt-1">{formatINR(item.price * item.qty)}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name}`}
                  className="self-start p-1.5 rounded-lg text-slate-300 hover:bg-rose-100 hover:text-rose-500 dark:hover:bg-rose-900/30 transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-slate-100 dark:border-slate-800 space-y-4 bg-slate-50/50 dark:bg-slate-900">
            {savings > 0 && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                <Tag size={13} className="text-emerald-600" />
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  You're saving {formatINR(savings)} on this order!
                </p>
              </div>
            )}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Delivery</span>
                <span className="text-emerald-600 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t border-slate-200 dark:border-slate-700 pt-2">
                <span>Total</span>
                <span className="text-brand-600">{formatINR(subtotal)}</span>
              </div>
            </div>
            <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-bold text-sm transition-all hover:shadow-lg hover:shadow-brand-500/30 active:scale-[0.98] flex items-center justify-center gap-2">
              Proceed to Checkout <ArrowRight size={15} />
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
