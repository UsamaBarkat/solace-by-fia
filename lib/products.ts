import productsData from "@/data/products.json";
import reviewsData from "@/data/reviews.json";

export type Category = "unstitched" | "stitched" | "chaddar";

export interface ProductImages {
  front: string;
  back: string;
  closeup: string;
  dupatta?: string;
}

export interface Product {
  code: string;
  name: string;
  category: Category;
  collection: string;
  fabric: string;
  pieces: string;
  price: number;
  salePrice?: number;
  inStock: boolean;
  badges?: string[];
  images: ProductImages;
  description: string;
}

export interface Review {
  name: string;
  rating: number;
  comment: string;
  photo?: string;
}

const products = productsData as Product[];
const reviews = reviewsData as Review[];

export function getAll(): Product[] {
  return products;
}

export function getByCode(code: string): Product | undefined {
  return products.find((p) => p.code === code);
}

export function getByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function getRelated(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.code !== product.code)
    .slice(0, limit);
}

export function getAllReviews(): Review[] {
  return reviews;
}
