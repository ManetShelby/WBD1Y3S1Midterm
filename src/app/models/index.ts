// Product interface
export interface Product {
  productid: number;
  item: string;
  qty: number;
  price: number;
  discount: number;
  categoryid: number;
  image?: string;
}

// Computed product with total calculations
export interface ProductWithTotals extends Product {
  total: number;
  grandTotal: number;
}

// Category interface
export interface CategoryModel {
  categoryid: number;
  categoryname: string;
  categoryremark?: string;
  description?: string;
}

// User interface
export interface UserModel {
  userid: number;
  username: string;
  email: string;
  password?: string;
  role?: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}
