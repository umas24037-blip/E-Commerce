import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Shield, Truck, Headphones, Laptop, Smartphone, Tv, Watch } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import SkeletonCard from '../components/SkeletonCard'
import HeroBanner from '../components/HeroBanner'
import QuickView from '../components/QuickView'
import { products } from '../data/products'

const perks = [
  { icon: Truck,   label: 'Free Delivery',   desc: 'On orders above ₹999',   color: 'text-blue-500',   bg: 'bg-blue-50 dark:bg-blue-500/10' },
  { icon: Shield,  label: '2-Year Warranty', desc: 'On all electronics',      color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
  { icon: Zap,     label: '24/7 Support',    desc: 'Expert help anytime',     color: 'text-amber-500',  bg: 'bg-amber-50 dark:bg-amber-500/10' },
]

const catLinks = [
  { label: 'Audio',       icon: Headphones, to: '/shop?cat=Audio',       color: 'from-rose-500 to-pink-600' },
  { label: 'Laptops',     icon: Laptop,     to: '/shop?cat=Laptops',     color: 'from-blue-500 to-indigo-600' },
  { label: 'Smartphones', icon: Smartphone, to: '/shop?cat=Smartphones', color: 'from-violet-500 to-purple-600' },
  { label: 'TVs',         icon: Tv,         to: '/shop?cat=TVs',         color: 'from-amber-500 to-orange-600' },
  { label: 'Wearables',   icon: Watch,      to: '/shop?cat=Wearables',   color: 'from-emerald-500 to-teal-600' },
]

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [quickView, setQuickView] = useState(null)
  const featured = products.slice(0, 8)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400)
    return () => clearTimeout(t)
  }, [])

  return (
    <main>
      <HeroBanner />

      {/* Category quick links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          {catLinks.map(({ label, icon: Icon, to, color }) => (
            <Link
              key={label}
              to={to}
              className={`shrink-0 flex flex-col items-center gap-2 w-24 py-4 rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 active:scale-95`}
            >
              <Icon size={22} />
              <span className="text-xs font-semibold">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Perks bar */}
      <section className="border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-slate-800">
          {perks.map(({ icon: Icon, label, desc, color, bg }) => (
            <div key={label} className="flex items-center gap-4 py-4 sm:py-0 sm:px-6 first:pl-0 last:pr-0">
              <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                <Icon size={20} className={color} />
              </div>
              <div>
                <p className="font-semibold text-sm">{label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-1">Curated For You</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Featured Products</h2>
          </div>
          <Link to="/shop" className="flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:gap-2.5 transition-all group">
            View all <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : featured.map(p => <ProductCard key={p.id} product={p} onQuickView={setQuickView} />)
          }
        </div>
      </section>

      {/* Promo banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-600 to-violet-600 p-8 sm:p-12 text-white">
          <div className="absolute right-0 top-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
          <div className="relative">
            <p className="text-sm font-semibold opacity-80 mb-2">Limited Time Offer</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">Get Extra ₹2,000 Off</h3>
            <p className="text-white/70 mb-6 max-w-md text-sm">Use code <span className="font-mono font-bold bg-white/20 px-2 py-0.5 rounded text-white">TECHVAULT200</span> on your first order above ₹15,000</p>
            <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-brand-700 font-bold text-sm hover:shadow-lg transition-all hover:scale-105 active:scale-95">
              Shop Now <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {quickView && <QuickView product={quickView} onClose={() => setQuickView(null)} />}
    </main>
  )
}
