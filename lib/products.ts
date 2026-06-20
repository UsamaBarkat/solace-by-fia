import reviewsData from "@/data/reviews.json";
import { sanityClient, urlForImage } from "@/lib/sanity";
import type { SanityImageSource } from "@sanity/image-url";

export type Category = "unstitched" | "stitched" | "chaddar";

export type PieceCount = "1pc" | "2pc" | "3pc";

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
  pieceCount: PieceCount;
  isNew: boolean;
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

// Shape returned by the GROQ query below (before mapping to Product).
interface RawProduct {
  code: string | null;
  name: string | null;
  category: string | null;
  collection: string | null;
  fabric: string | null;
  pieces: string | null;
  pieceCount: string | null;
  isNew: boolean | null;
  price: number | null;
  salePrice: number | null;
  inStock: boolean | null;
  badges: string[] | null;
  imageFront: SanityImageSource | null;
  imageBack: SanityImageSource | null;
  imageCloseup: SanityImageSource | null;
  description: string | null;
}

const PRODUCTS_QUERY = `*[_type == "product" && defined(code.current)] | order(code.current asc){
  "code": code.current,
  "name": title,
  category,
  collection,
  fabric,
  pieces,
  pieceCount,
  isNew,
  price,
  salePrice,
  inStock,
  badges,
  imageFront,
  imageBack,
  imageCloseup,
  description
}`;

function imageUrl(source: SanityImageSource | null): string | undefined {
  return source ? urlForImage(source) : undefined;
}

function mapProduct(raw: RawProduct): Product {
  // Front/back/closeup may reuse one image; fall back to the front image when absent
  // so the return shape matches the old products.json exactly.
  const front = imageUrl(raw.imageFront) ?? imageUrl(raw.imageBack) ?? imageUrl(raw.imageCloseup) ?? "";
  const back = imageUrl(raw.imageBack) ?? front;
  const closeup = imageUrl(raw.imageCloseup) ?? front;

  return {
    code: raw.code ?? "",
    name: raw.name ?? "",
    category: (raw.category ?? "unstitched") as Category,
    collection: raw.collection ?? "",
    fabric: raw.fabric ?? "",
    pieces: raw.pieces ?? "",
    pieceCount: (raw.pieceCount ?? "1pc") as PieceCount,
    isNew: raw.isNew ?? false,
    price: raw.price ?? 0,
    ...(raw.salePrice != null ? { salePrice: raw.salePrice } : {}),
    inStock: raw.inStock ?? false,
    ...(raw.badges && raw.badges.length > 0 ? { badges: raw.badges } : {}),
    images: { front, back, closeup },
    description: raw.description ?? "",
  };
}

// Fetched once at build time (SSG). Keeps the helpers below synchronous, so pages and
// components that call them are unchanged.
const products: Product[] = (await sanityClient.fetch<RawProduct[]>(PRODUCTS_QUERY)).map(mapProduct);
const reviews = reviewsData as Review[];

export function getAll(): Product[] {
  return products;
}

export function getByCode(code: string): Product | undefined {
  return products.find((p) => p.code === code);
}

export function getByPieceCount(count: PieceCount): Product[] {
  return products.filter((p) => p.pieceCount === count);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getClearance(): Product[] {
  return products.filter((p) => p.salePrice !== undefined);
}

export function getRelated(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.pieceCount === product.pieceCount && p.code !== product.code)
    .slice(0, limit);
}

export function getAllReviews(): Review[] {
  return reviews;
}
