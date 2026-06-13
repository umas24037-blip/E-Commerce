import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

export default function Wishlist() {
  const { wished } = useWishlist()

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Wishlist</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">{wished.length} saved items</p>
      </div>

      {wished.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-24 text-slate-400">
          <Heart size={56} strokeWidth={1} />
          <p className="text-lg font-medium">No items in your wishlist</p>
          <Link to="/shop" className="text-sm text-brand-600 hover:underline">Browse products →</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {wished.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </main>
  )
}
