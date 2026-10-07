import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'wrence-wishlist'

const WishlistContext = createContext(null)

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist))
  }, [wishlist])

  const toggleWishlist = (productId) => {
    setWishlist((current) => {
      if (current.includes(productId)) {
        return current.filter((id) => id !== productId)
      }

      return [...current, productId]
    })
  }

  const isWishlisted = (productId) => wishlist.includes(productId)

  const value = useMemo(
    () => ({
      wishlist,
      wishlistCount: wishlist.length,
      toggleWishlist,
      isWishlisted,
    }),
    [wishlist],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)

  if (!context) {
    throw new Error('useWishlist must be used inside a WishlistProvider')
  }

  return context
}
