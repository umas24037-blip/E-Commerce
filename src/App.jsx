import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, CartProvider, WishlistProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Deals from './pages/Deals'
import Support from './pages/Support'
import Wishlist from './pages/Wishlist'
import Orders from './pages/Orders'

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-400">
        © 2025 TechVault. All rights reserved.
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/"         element={<Home />} />
                <Route path="/shop"     element={<Shop />} />
                <Route path="/deals"    element={<Deals />} />
                <Route path="/support"  element={<Support />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/orders"   element={<Orders />} />
                <Route path="*"         element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  )
}
