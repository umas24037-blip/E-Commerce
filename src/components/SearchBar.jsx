import { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { products } from '../data/products'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()

  const suggestions = query.trim().length > 0
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : []

  useEffect(() => {
    function handle(e) { if (!ref.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  function handleSelect(product) {
    setQuery(product.name)
    setOpen(false)
    navigate('/shop')
  }

  return (
    <div ref={ref} className="relative w-full max-w-xs sm:max-w-sm">
      <div className="relative flex items-center">
        <Search size={16} className="absolute left-3 text-slate-400 pointer-events-none" />
        <input
          type="search"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          placeholder="Search products…"
          aria-label="Search products"
          className="w-full pl-9 pr-9 py-2 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition placeholder:text-slate-400"
        />
        {query && (
          <button onClick={() => { setQuery(''); setOpen(false) }} aria-label="Clear search" className="absolute right-3 text-slate-400 hover:text-slate-600">
            <X size={14} />
          </button>
        )}
      </div>

      {open && suggestions.length > 0 && (
        <ul
          role="listbox"
          aria-label="Search suggestions"
          className="absolute top-full mt-2 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden z-50 animate-fade-in"
        >
          {suggestions.map(p => (
            <li key={p.id} role="option" aria-selected="false">
              <button
                onClick={() => handleSelect(p)}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-colors"
              >
                <img src={p.image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                <div>
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-slate-400">{p.category}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
