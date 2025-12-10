import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'sonner';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const calculateTotals = (items) => {
  let totalQuantity = 0;
  let totalPrice = 0;
  for (const item of items) {
    totalQuantity += item.quantity;
    totalPrice += item.price * item.quantity;
  }
  return { totalQuantity, totalPrice };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
        toast.success(`Increased quantity of ${newItem.name || 'item'}`, {
          description: `New quantity: ${existingItem.quantity}`,
          duration: 2000,
        });
      } else {
        state.items.push({ ...newItem, quantity: 1 });
        toast.success(`Added ${newItem.name || 'item'} to cart`, {
          description: 'You can check your cart now',
          duration: 2500,
        });
      }
      
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },
    
    removeItem: (state, action) => { 
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      
      if (existingItem) {
        const itemName = existingItem.name || 'Item';
        
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(item => item.id !== id);
          toast.info(`Removed ${itemName} from cart`, {
            duration: 2000,
          });
        } else {
          existingItem.quantity -= 1;
          toast.info(`Decreased quantity of ${itemName}`, {
            description: `New quantity: ${existingItem.quantity}`,
            duration: 2000,
          });
        }
      }
      
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      
      if (item) {
        const itemName = item.name || 'Item';
        
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== id);
          toast.info(`Removed ${itemName} from cart`, {
            duration: 2000,
          });
        } else {
          const oldQuantity = item.quantity;
          item.quantity = quantity;
          
          if (quantity > oldQuantity) {
            toast.success(`Updated quantity of ${itemName}`, {
              description: `New quantity: ${quantity}`,
              duration: 2000,
            });
          } else {
            toast.info(`Updated quantity of ${itemName}`, {
              description: `New quantity: ${quantity}`,
              duration: 2000,
            });
          }
        }
      }
      
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },
    
    clearCart: (state) => {
      const itemCount = state.items.length;
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      
      if (itemCount > 0) {
        toast.success('Cart cleared successfully', {
          description: `Removed ${itemCount} items from cart`,
          duration: 2500,
        });
      }
    }
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
