import { createContext, useContext, useState, useEffect, useCallback } from 'react'

// ─── Theme ────────────────────────────────────────────────────────────────────
const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme')
    return stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

// ─── Cart ─────────────────────────────────────────────────────────────────────
const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addToCart = useCallback((product) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === product.id)
      return exists
        ? prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...product, qty: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, totalItems }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)

// ─── Wishlist ─────────────────────────────────────────────────────────────────
const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wished, setWished] = useState([])

  const toggle = useCallback((product) => {
    setWished(prev =>
      prev.find(i => i.id === product.id)
        ? prev.filter(i => i.id !== product.id)
        : [...prev, product]
    )
  }, [])

  const isWished = useCallback((id) => wished.some(i => i.id === id), [wished])

  return (
    <WishlistContext.Provider value={{ wished, toggle, isWished, count: wished.length }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
