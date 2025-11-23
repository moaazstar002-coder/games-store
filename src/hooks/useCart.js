import { useState, useEffect } from 'react';
import axios from 'axios';

export function useCart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [remoteAvailable, setRemoteAvailable] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get('/api/cart');
        setCart(res.data || []);
        setRemoteAvailable(true);
      } catch {
        // fallback to localStorage when backend not present
        setRemoteAvailable(false);
        try {
          const raw = localStorage.getItem('cart:v1');
          setCart(raw ? JSON.parse(raw) : []);
        } catch {
          setCart([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const persistLocal = (next) => {
    try {
      localStorage.setItem('cart:v1', JSON.stringify(next));
    } catch (e) {
      console.warn('localStorage write failed', e);
    }
  };

  const addToCart = async (item) => {
    if (!item || !item.id) return;
    try {
      if (remoteAvailable) await axios.post('/api/cart', item);
    } catch (err) {
      console.warn('remote add to cart failed, falling back to local', err);
      setRemoteAvailable(false);
    }
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      let next;
      if (exists) {
        next = prev.map((p) => p.id === item.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p);
      } else {
        next = [...prev, { ...item, quantity: item.quantity || 1 }];
      }
      persistLocal(next);
      return next;
    });
  };

  const removeFromCart = async (id) => {
    try {
      if (remoteAvailable) await axios.delete(`/api/cart/${id}`);
    } catch (err) {
      console.warn('remote remove from cart failed, falling back to local', err);
      setRemoteAvailable(false);
    }
    setCart((prev) => {
      const next = prev.filter((p) => p.id !== id);
      persistLocal(next);
      return next;
    });
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity <= 0) return removeFromCart(id);
    try {
      if (remoteAvailable) await axios.patch(`/api/cart/${id}`, { quantity });
    } catch (err) {
      console.warn('remote update quantity failed, falling back to local', err);
      setRemoteAvailable(false);
    }
    setCart((prev) => {
      const next = prev.map((p) => p.id === id ? { ...p, quantity } : p);
      persistLocal(next);
      return next;
    });
  };

  const isInCart = (id) => cart.some((p) => p.id === id);

  return { cart, loading, addToCart, removeFromCart, updateQuantity, isInCart, remoteAvailable };
}
