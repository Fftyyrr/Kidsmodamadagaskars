
import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Product, Category, CartItem, Order, ContactInfo, DataContextType, OrderItem } from '../types';

const sampleProducts: Product[] = [
  { id: '1', name: 'Лляна сорочка "Сафарі"', categoryId: '1', price: 450, imageUrl: 'https://picsum.photos/seed/p1/400/400', sizes: ['98', '104', '110'], isAvailable: true },
  { id: '2', name: 'Джинсовий комбінезон', categoryId: '2', price: 620, imageUrl: 'https://picsum.photos/seed/p2/400/400', sizes: ['104', '110', '116'], isAvailable: true },
  { id: '3', name: 'Бавовняна футболка "Лев"', categoryId: '3', price: 280, imageUrl: 'https://picsum.photos/seed/p3/400/400', sizes: ['98', '116'], isAvailable: true },
  { id: '4', name: 'Легка сукня "Квітка"', categoryId: '4', price: 550, imageUrl: 'https://picsum.photos/seed/p4/400/400', sizes: ['104', '110'], isAvailable: false },
  { id: '5', name: 'Шорти "Джунглі"', categoryId: '1', price: 350, imageUrl: 'https://picsum.photos/seed/p5/400/400', sizes: ['98', '104', '110', '116'], isAvailable: true },
];

const sampleCategories: Category[] = [
  { id: '1', name: 'Літній одяг' },
  { id: '2', name: 'Джинси' },
  { id: '3', name: 'Футболки' },
  { id: '4', name: 'Сукні' },
];

const sampleContactInfo: ContactInfo = {
    phone: "+380956071603",
    viber: "+380956071603",
    address: "м. Київ, вул. Дитяча, 1"
};

export const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(sampleContactInfo);
  
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem('products');
      setProducts(storedProducts ? JSON.parse(storedProducts) : sampleProducts);

      const storedCategories = localStorage.getItem('categories');
      setCategories(storedCategories ? JSON.parse(storedCategories) : sampleCategories);
      
      const storedCart = localStorage.getItem('cart');
      setCart(storedCart ? JSON.parse(storedCart) : []);

      const storedOrders = localStorage.getItem('orders');
      setOrders(storedOrders ? JSON.parse(storedOrders) : []);

      const storedContacts = localStorage.getItem('contactInfo');
      setContactInfo(storedContacts ? JSON.parse(storedContacts) : sampleContactInfo);
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
      setProducts(sampleProducts);
      setCategories(sampleCategories);
      setCart([]);
      setOrders([]);
      setContactInfo(sampleContactInfo);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('contactInfo', JSON.stringify(contactInfo));
  }, [contactInfo]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    setProducts(prev => [...prev, { ...product, id: Date.now().toString() }]);
  };
  
  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };
  
  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };
  
  const addCategory = (category: Omit<Category, 'id'>) => {
    setCategories(prev => [...prev, { ...category, id: Date.now().toString() }]);
  };

  const deleteCategory = (categoryId: string) => {
    setProducts(prev => prev.map(p => p.categoryId === categoryId ? {...p, categoryId: ''} : p));
    setCategories(prev => prev.filter(c => c.id !== categoryId));
  };

  const addToCart = (productId: string, size: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === productId && item.size === size);
      if (existingItem) {
        return prevCart.map(item =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { productId, size, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.productId === productId && item.size === size)));
  };

  const updateCartQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
        removeFromCart(productId, size);
        return;
    }
    setCart(prev => prev.map(item => item.productId === productId && item.size === size ? {...item, quantity} : item));
  };

  const clearCart = () => {
    setCart([]);
  };
  
  const placeOrder = (): Order | null => {
    if (cart.length === 0) return null;

    const orderItems: OrderItem[] = cart.map(cartItem => {
        const product = products.find(p => p.id === cartItem.productId);
        if (!product) {
            throw new Error(`Product with id ${cartItem.productId} not found`);
        }
        return {
            product: product,
            size: cartItem.size,
            quantity: cartItem.quantity,
        };
    });

    const newOrder: Order = {
        id: `MDG-${Date.now()}`,
        items: orderItems,
        timestamp: new Date().toISOString(),
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateContactInfo = (info: ContactInfo) => {
    setContactInfo(info);
  };
  
  const getProductById = useCallback((id: string) => products.find(p => p.id === id), [products]);
  const getCategoryById = useCallback((id: string) => categories.find(c => c.id === id), [categories]);
  

  return (
    <DataContext.Provider value={{
      products,
      categories,
      cart,
      orders,
      contactInfo,
      addProduct,
      updateProduct,
      deleteProduct,
      addCategory,
      deleteCategory,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      placeOrder,
      updateContactInfo,
      getProductById,
      getCategoryById,
    }}>
      {children}
    </DataContext.Provider>
  );
};
