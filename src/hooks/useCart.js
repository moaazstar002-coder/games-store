import { useState, useEffect } from 'react';
import axios from 'axios';

export function useCart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [remoteAvailable, setRemoteAvailable] = useState(true);

  const ensureArray = (data) => {
    return Array.isArray(data) ? data : [];
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get('/api/cart');
        setCart(ensureArray(res.data));
        setRemoteAvailable(true);
      } catch {
        setRemoteAvailable(false);
        try {
          const raw = localStorage.getItem('cart:v1');
          const parsed = raw ? JSON.parse(raw) : [];
          setCart(ensureArray(parsed));
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
    } catch {
      console.warn('remote add failed, fallback local');
      setRemoteAvailable(false);
    }

    setCart((prev) => {
      const arr = ensureArray(prev);
      const exists = arr.find((p) => p.id === item.id);

      let next;
      if (exists) {
        next = arr.map((p) =>
          p.id === item.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        );
      } else {
        next = [...arr, { ...item, quantity: item.quantity || 1 }];
      }

      persistLocal(next);
      return next;
    });
  };

  const removeFromCart = async (id) => {
    try {
      if (remoteAvailable) await axios.delete(`/api/cart/${id}`);
    } catch {
      setRemoteAvailable(false);
    }

    setCart((prev) => {
      const arr = ensureArray(prev);
      const next = arr.filter((p) => p.id !== id);
      persistLocal(next);
      return next;
    });
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity <= 0) return removeFromCart(id);

    try {
      if (remoteAvailable) await axios.patch(`/api/cart/${id}`, { quantity });
    } catch {
      setRemoteAvailable(false);
    }

    setCart((prev) => {
      const arr = ensureArray(prev);
      const next = arr.map((p) =>
        p.id === id ? { ...p, quantity } : p
      );
      persistLocal(next);
      return next;
    });
  };

  const isInCart = (id) => {
    const arr = ensureArray(cart);
    return arr.some((p) => p.id === id);
  };

  return {
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    isInCart,
    remoteAvailable,
  };
}
