
export interface Product {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  imageUrl: string;
  sizes: string[];
  isAvailable: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface CartItem {
  productId: string;
  size: string;
  quantity: number;
}

export interface OrderItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  timestamp: string;
}

export interface ContactInfo {
  phone: string;
  viber: string;
  address: string;
}

export interface DataContextType {
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  orders: Order[];
  contactInfo: ContactInfo;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  deleteCategory: (categoryId: string) => void;
  addToCart: (productId: string, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateCartQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: () => Order | null;
  updateContactInfo: (info: ContactInfo) => void;
  getProductById: (id: string) => Product | undefined;
  getCategoryById: (id: string) => Category | undefined;
}
