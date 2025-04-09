import React, { createContext, useState, useContext, useEffect } from 'react'
import { productData, Product } from '../data/products'

// Type definitions
type CartItemType = {
  id: string
  name: string
  price: number
  image: string
  imageUrl?: string
  quantity: number
  variant?: string
}

export type ProductVariantType = {
  id: string
  name: string
  features: string[]
  image: string
  price: number
}

type NotificationType = {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
  duration?: number
}

type AppContextType = {
  isAuthenticated: boolean
  products: Product[]
  cart: CartItemType[]
  notifications: NotificationType[]
  addToCart: (product: Product, quantity: number, variant?: string) => void
  removeFromCart: (id: string) => void
  updateCartItemQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  showNotification: (message: string, type?: 'success' | 'error' | 'info', duration?: number) => void
  removeNotification: (id: string) => void
  isCartOpen: boolean
  setCartOpen: (isOpen: boolean) => void
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated] = useState(false)
  const [products] = useState<Product[]>(productData)
  const [cart, setCart] = useState<CartItemType[]>([])
  const [notifications, setNotifications] = useState<NotificationType[]>([])
  const [isCartOpen, setCartOpen] = useState(false)

// Remove unused navigate declaration since it's not being used

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      // Find if the product is already in the cart
      const existingItemIndex = prevCart.findIndex(
        item => item.id === product.id
      )

      // If the item exists, update the quantity
      if (existingItemIndex !== -1) {
        const newCart = [...prevCart]
        newCart[existingItemIndex].quantity += quantity
        return newCart
      }

      // If it doesn't exist, add it to the cart
      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.imageUrl,
          imageUrl: product.imageUrl,
          quantity
        },
      ]
    })

    showNotification('Added to cart', 'success')
  }

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id))
    showNotification('Removed from cart', 'info')
  }

  const updateCartItemQuantity = (id: string, quantity: number) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
    showNotification('Cart cleared', 'info')
  }

  const showNotification = (
    message: string,
    type: 'success' | 'error' | 'info' = 'info',
    duration: number = 3000
  ) => {
    const id = Date.now().toString()
    setNotifications(prev => [...prev, { id, message, type, duration }])

    // Automatically remove notification after duration
    setTimeout(() => {
      removeNotification(id)
    }, duration)
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        products,
        cart,
        notifications,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        showNotification,
        removeNotification,
        isCartOpen,
        setCartOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// Custom hook to use the app context
export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}