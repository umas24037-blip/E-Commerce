import { useState, useEffect } from 'react'
import { Timer, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { deals, products } from '../data/products'
import ProductCard from '../components/ProductCard'

function useCountdown(initial) {
  const [time, setTime] = useState(initial)

  useEffect(() => {
    const t = setInterval(() => {
      setTime(prev => {
        const [h, m, s] = prev.split(':').map(Number)
        const total = h * 3600 + m * 60 + s - 1
        if (total <= 0) return '00:00:00'
        const hh = String(Math.floor(total / 3600)).padStart(2, '0')
        const mm = String(Math.floor((total % 3600) / 60)).padStart(2, '0')
        const ss = String(total % 60).padStart(2, '0')
        return `${hh}:${mm}:${ss}`
      })
    }, 1000)
    return () => clearInterval(t)
  }, [])

  return time
}

function DealCard({ deal }) {
  const time = useCountdown(deal.ends)
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${deal.color} p-6 text-white shadow-lg`}>
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <span className="text-xs font-semibold uppercase tracking-widest opacity-80">{deal.label}</span>
      <h3 className="text-xl font-bold mt-2 mb-1">{deal.desc}</h3>
      <div className="flex items-center gap-2 mt-4">
        <Timer size={14} className="opacity-80" />
        <span className="text-sm font-mono font-semibold">{time}</span>
        <span className="text-xs opacity-70">remaining</span>
      </div>
      <Link
        to="/shop"
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-colors"
      >
        Grab Deal <ArrowRight size={13} />
      </Link>
    </div>
  )
}

export default function Deals() {
  const dealProducts = products.filter(p => p.originalPrice)

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Deals & Offers</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Limited time deals — don't miss out</p>
      </div>

      {/* Deal cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
        {deals.map(d => <DealCard key={d.id} deal={d} />)}
      </div>

      {/* Products on sale */}
      <h2 className="text-xl font-bold mb-6">Products on Sale</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {dealProducts.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </main>
  )
}
