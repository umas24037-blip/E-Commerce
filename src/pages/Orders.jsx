import { Package } from 'lucide-react'
import { Link } from 'react-router-dom'

const mockOrders = [
  { id: '#TVC-4821', date: 'Jun 12, 2025', items: 2, total: '$449.98', status: 'Delivered',   color: 'text-green-600 bg-green-50 dark:bg-green-900/20' },
  { id: '#TVC-4790', date: 'Jun 5, 2025',  items: 1, total: '$99.99',  status: 'In Transit',  color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' },
  { id: '#TVC-4712', date: 'May 28, 2025', items: 3, total: '$2,347.97',status: 'Processing', color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20' },
]

export default function Orders() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Order History</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Track and manage your past orders</p>
      </div>

      <div className="space-y-4">
        {mockOrders.map(order => (
          <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-600/10 flex items-center justify-center">
                <Package size={18} className="text-brand-600" />
              </div>
              <div>
                <p className="font-semibold text-sm">{order.id}</p>
                <p className="text-xs text-slate-400">{order.date} · {order.items} item{order.items > 1 ? 's' : ''}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${order.color}`}>
                {order.status}
              </span>
              <span className="font-bold text-sm">{order.total}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link to="/shop" className="text-sm text-brand-600 hover:underline">Continue shopping →</Link>
      </div>
    </main>
  )
}
