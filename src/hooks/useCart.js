import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

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
        toast.warning('Loaded from local storage', {
          description: 'Cannot connect to server',
          duration: 3000,
        });
        try {
          const raw = localStorage.getItem('cart:v1');
          const parsed = raw ? JSON.parse(raw) : [];
          setCart(ensureArray(parsed));
        } catch {
          setCart([]);
          toast.error('Error loading cart', {
            description: 'Creating a new cart',
            duration: 3000,
          });
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
      toast.error('Failed to save data locally', {
        description: 'You may lose data when closing browser',
        duration: 3000,
      });
    }
  };

  const addToCart = async (item) => {
    if (!item || !item.id) {
      toast.error('Error adding item', {
        description: 'Invalid item data',
        duration: 2500,
      });
      return;
    }

    try {
      if (remoteAvailable) await axios.post('/api/cart', item);
    } catch {
      console.warn('remote add failed, fallback local');
      setRemoteAvailable(false);
      toast.warning('Saved locally only', {
        description: 'Cannot connect to server',
        duration: 2500,
      });
    }

    setCart((prev) => {
      const arr = ensureArray(prev);
      const exists = arr.find((p) => p.id === item.id);

      let next;
      if (exists) {
        next = arr.map((p) =>
          p.id === item.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        );
        toast.success(`Increased quantity of ${item.name || 'item'}`, {
          description: `New quantity: ${(exists.quantity || 1) + 1}`,
          duration: 2000,
        });
      } else {
        next = [...arr, { ...item, quantity: item.quantity || 1 }];
        toast.success(`Added ${item.name || 'item'} to cart`, {
          description: 'You can check your cart now',
          duration: 2500,
        });
      }

      persistLocal(next);
      return next;
    });
  };

  const removeFromCart = async (id) => {
    const item = cart.find((p) => p.id === id);
    
    try {
      if (remoteAvailable) await axios.delete(`/api/cart/${id}`);
    } catch {
      setRemoteAvailable(false);
      toast.warning('Removed locally only', {
        description: 'Cannot connect to server',
        duration: 2500,
      });
    }

    setCart((prev) => {
      const arr = ensureArray(prev);
      const next = arr.filter((p) => p.id !== id);
      persistLocal(next);
      
      if (item) {
        toast.info(`Removed ${item.name || 'item'} from cart`, {
          duration: 2000,
        });
      }
      
      return next;
    });
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity <= 0) return removeFromCart(id);

    const item = cart.find((p) => p.id === id);
    
    try {
      if (remoteAvailable) await axios.patch(`/api/cart/${id}`, { quantity });
    } catch {
      setRemoteAvailable(false);
      toast.warning('Updated locally only', {
        description: 'Cannot connect to server',
        duration: 2500,
      });
    }

    setCart((prev) => {
      const arr = ensureArray(prev);
      const next = arr.map((p) =>
        p.id === id ? { ...p, quantity } : p
      );
      persistLocal(next);
      
      if (item) {
        const oldQuantity = item.quantity || 1;
        if (quantity > oldQuantity) {
          toast.success(`Updated quantity of ${item.name || 'item'}`, {
            description: `New quantity: ${quantity}`,
            duration: 2000,
          });
        } else {
          toast.info(`Updated quantity of ${item.name || 'item'}`, {
            description: `New quantity: ${quantity}`,
            duration: 2000,
          });
        }
      }
      
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
