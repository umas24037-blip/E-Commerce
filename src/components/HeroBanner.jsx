import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { banners } from '../data/products'

export default function HeroBanner() {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const t = setInterval(() => go((active + 1) % banners.length), 5000)
    return () => clearInterval(t)
  }, [active])

  function go(idx) {
    if (animating) return
    setAnimating(true)
    setActive(idx)
    setTimeout(() => setAnimating(false), 600)
  }

  const b = banners[active]

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br ${b.bg} text-white transition-all duration-700`} style={{ minHeight: '420px' }}>
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: b.accent, transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Text */}
        <div className={`space-y-5 transition-all duration-500 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border" style={{ borderColor: b.accent + '60', color: b.accent, background: b.accent + '18' }}>
            {b.tag}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            {b.title}
          </h1>
          <p className="text-slate-300 text-base max-w-md leading-relaxed">{b.sub}</p>
          <div className="flex gap-3 flex-wrap">
            <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg" style={{ background: b.accent, color: '#0f172a' }}>
              {b.cta} <ArrowRight size={15} />
            </Link>
            <Link to="/deals" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-all">
              View Deals
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className={`hidden lg:flex justify-end transition-all duration-500 ${animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <div className="relative w-80 h-64 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {/* Prev */}
        <button onClick={() => go((active - 1 + banners.length) % banners.length)} aria-label="Previous slide" className="p-1.5 rounded-full bg-white/10 hover:bg-white/25 transition-colors">
          <ChevronLeft size={14} />
        </button>
        {/* Dots */}
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${i === active ? 'w-6 h-2' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`}
            style={i === active ? { background: b.accent } : {}}
          />
        ))}
        {/* Next */}
        <button onClick={() => go((active + 1) % banners.length)} aria-label="Next slide" className="p-1.5 rounded-full bg-white/10 hover:bg-white/25 transition-colors">
          <ChevronRight size={14} />
        </button>
      </div>
    </section>
  )
}
