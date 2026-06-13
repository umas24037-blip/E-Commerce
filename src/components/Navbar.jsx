import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingCart, Heart, Clock, Sun, Moon, Zap, Menu, X, Bell } from 'lucide-react'
import { useTheme, useCart, useWishlist } from '../context/AppContext'
import SearchBar from './SearchBar'
import CartDrawer from './CartDrawer'

function Badge({ count, color = 'bg-brand-600' }) {
  if (!count) return null
  return (
    <span className={`absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold ${color} text-white rounded-full px-1 shadow-md ring-2 ring-white dark:ring-slate-950 animate-[fadeIn_0.2s_ease]`}>
      {count > 99 ? '99+' : count}
    </span>
  )
}

const navLinks = [
  { to: '/shop',    label: 'Shop' },
  { to: '/deals',   label: 'Deals' },
  { to: '/support', label: 'Support' },
]

export default function Navbar() {
  const { dark, toggle } = useTheme()
  const { totalItems } = useCart()
  const { count: wishCount } = useWishlist()
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const linkCls = 'relative text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors py-1'
  const activeCls = 'text-brand-600 dark:text-brand-400'

  return (
    <>
      <header className="sticky top-0 z-30 w-full">
        <div className="bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800/70 shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3 lg:gap-5" aria-label="Main navigation">

            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2 shrink-0" aria-label="TechVault Home">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center shadow-md shadow-brand-500/30">
                <Zap size={17} className="text-white" fill="white" />
              </div>
              <span className="font-extrabold text-lg tracking-tight hidden sm:block">
                Tech<span className="bg-gradient-to-r from-brand-600 to-violet-600 bg-clip-text text-transparent">Vault</span>
              </span>
            </NavLink>

            {/* Search */}
            <div className="flex-1 max-w-lg">
              <SearchBar />
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-7">
              {navLinks.map(({ to, label }) => (
                <NavLink key={to} to={to} className={({ isActive }) => `${linkCls} ${isActive ? activeCls : ''} group`}>
                  {label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-brand-600 rounded-full group-hover:w-full transition-all duration-200" />
                </NavLink>
              ))}
            </div>

            {/* Action icons */}
            <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
              {/* Theme */}
              <button
                onClick={toggle}
                aria-label={dark ? 'Light mode' : 'Dark mode'}
                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {dark
                  ? <Sun size={17} className="text-amber-400" />
                  : <Moon size={17} className="text-slate-500" />
                }
              </button>

              {/* Orders */}
              <NavLink to="/orders" aria-label="Order History" className="hidden sm:flex p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
                <Clock size={17} className="text-slate-500 dark:text-slate-400" />
              </NavLink>

              {/* Wishlist */}
              <NavLink to="/wishlist" aria-label={`Wishlist (${wishCount})`} className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
                <Heart size={17} className="text-slate-500 dark:text-slate-400" />
                <Badge count={wishCount} color="bg-rose-500" />
              </NavLink>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                aria-label={`Cart (${totalItems} items)`}
                className="flex items-center gap-2 pl-2.5 pr-3 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white transition-all hover:shadow-lg hover:shadow-brand-500/30 active:scale-95 relative"
              >
                <ShoppingCart size={16} />
                {totalItems > 0 && (
                  <span className="text-xs font-bold hidden sm:block">{totalItems}</span>
                )}
                {totalItems > 0 && (
                  <span className="sm:hidden absolute -top-1.5 -right-1.5 w-4 h-4 text-[9px] font-bold bg-rose-500 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-950">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(m => !m)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                className="md:hidden p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-1"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </nav>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 py-4 flex flex-col gap-1 animate-fade-in">
              {[...navLinks, { to: '/orders', label: 'Order History' }, { to: '/wishlist', label: 'Wishlist' }].map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-brand-50 dark:bg-brand-600/10 text-brand-600' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
