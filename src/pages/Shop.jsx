import { useEffect, useState, useMemo } from 'react'
import { SlidersHorizontal, LayoutGrid, List, Search, X } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import SkeletonCard from '../components/SkeletonCard'
import QuickView from '../components/QuickView'
import { products, categories } from '../data/products'

const sortOptions = [
  { value: 'default',    label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating',     label: 'Top Rated' },
  { value: 'reviews',    label: 'Most Reviewed' },
]

export default function Shop() {
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [sort, setSort] = useState('default')
  const [search, setSearch] = useState('')
  const [maxPrice, setMaxPrice] = useState(200000)
  const [gridView, setGridView] = useState(true)
  const [quickView, setQuickView] = useState(null)
  const [inStockOnly, setInStockOnly] = useState(false)

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(t)
  }, [activeCategory, sort, search, maxPrice, inStockOnly])

  const filtered = useMemo(() => {
    let list = products.filter(p => {
      if (activeCategory !== 'All' && p.category !== activeCategory) return false
      if (inStockOnly && !p.inStock) return false
      if (p.price > maxPrice) return false
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) &&
          !p.specs.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
    if (sort === 'price-asc')  return [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') return [...list].sort((a, b) => b.price - a.price)
    if (sort === 'rating')     return [...list].sort((a, b) => b.rating - a.rating)
    if (sort === 'reviews')    return [...list].sort((a, b) => b.reviews - a.reviews)
    return list
  }, [activeCategory, sort, search, maxPrice, inStockOnly])

  const hasFilters = activeCategory !== 'All' || search || maxPrice < 200000 || inStockOnly

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Shop</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
          {loading ? 'Loading…' : `${filtered.length} product${filtered.length !== 1 ? 's' : ''} found`}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ── Sidebar filters ── */}
        <aside className="lg:w-56 shrink-0 space-y-6">
          {/* Search within shop */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products…"
              aria-label="Filter by name"
              className="w-full pl-8 pr-8 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <X size={12} />
              </button>
            )}
          </div>

          {/* Categories */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Category</p>
            <div className="flex flex-col gap-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={`text-left px-3 py-2 rounded-xl text-sm transition-all font-medium ${
                    activeCategory === cat
                      ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/30'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div>
            <div className="flex justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Max Price</p>
              <span className="text-xs font-semibold text-brand-600">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range" min={5000} max={200000} step={5000}
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              aria-label="Maximum price filter"
              className="w-full accent-brand-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>₹5K</span><span>₹2L</span>
            </div>
          </div>

          {/* In stock toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">In Stock Only</span>
            <button
              onClick={() => setInStockOnly(v => !v)}
              aria-pressed={inStockOnly}
              aria-label="Toggle in-stock filter"
              className={`w-11 h-6 rounded-full transition-colors duration-200 relative ${inStockOnly ? 'bg-brand-600' : 'bg-slate-200 dark:bg-slate-700'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${inStockOnly ? 'translate-x-5' : ''}`} />
            </button>
          </div>

          {/* Clear filters */}
          {hasFilters && (
            <button
              onClick={() => { setActiveCategory('All'); setSearch(''); setMaxPrice(200000); setInStockOnly(false) }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-500 hover:border-brand-500 hover:text-brand-600 transition-all"
            >
              <X size={13} /> Clear Filters
            </button>
          )}
        </aside>

        {/* ── Main content ── */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-5 gap-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-slate-400" />
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                aria-label="Sort products"
                className="text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500/30 cursor-pointer"
              >
                {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {/* Grid / List toggle */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
              <button
                onClick={() => setGridView(true)}
                aria-label="Grid view"
                aria-pressed={gridView}
                className={`p-2 rounded-lg transition-colors ${gridView ? 'bg-white dark:bg-slate-700 shadow-sm text-brand-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setGridView(false)}
                aria-label="List view"
                aria-pressed={!gridView}
                className={`p-2 rounded-lg transition-colors ${!gridView ? 'bg-white dark:bg-slate-700 shadow-sm text-brand-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <List size={15} />
              </button>
            </div>
          </div>

          {/* Category pills (mobile) */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-4 lg:hidden">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat ? 'bg-brand-600 text-white' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className={gridView ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5' : 'flex flex-col gap-4'}>
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-24 text-slate-400">
              <Search size={48} strokeWidth={1} />
              <p className="font-medium">No products match your filters</p>
              <button onClick={() => { setActiveCategory('All'); setSearch(''); setMaxPrice(200000); setInStockOnly(false) }} className="text-sm text-brand-600 hover:underline">
                Clear all filters
              </button>
            </div>
          ) : gridView ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map(p => <ProductCard key={p.id} product={p} onQuickView={setQuickView} />)}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filtered.map(p => (
                <div key={p.id} className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all group">
                  <img src={p.image} alt={p.name} className="w-28 h-24 object-cover rounded-xl shrink-0 group-hover:scale-105 transition-transform duration-300" />
                  <div className="flex flex-1 flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
                    <div className="min-w-0">
                      <span className="text-[10px] font-semibold text-brand-600 uppercase tracking-widest">{p.category}</span>
                      <h3 className="font-semibold text-sm mt-0.5 truncate">{p.name}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{p.specs}</p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <div>
                        <p className="font-extrabold text-lg">₹{p.price.toLocaleString('en-IN')}</p>
                        {p.originalPrice && <p className="text-xs text-slate-400 line-through">₹{p.originalPrice.toLocaleString('en-IN')}</p>}
                      </div>
                      <button onClick={() => setQuickView(p)} className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition-all hover:scale-105 active:scale-95">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {quickView && <QuickView product={quickView} onClose={() => setQuickView(null)} />}
    </main>
  )
}
