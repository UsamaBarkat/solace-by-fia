import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = "2024-01-01";

// Public dataset → no token needed. An optional build-time read token
// (SANITY_API_READ_TOKEN) is used if present; it's only ever read at build (SSG),
// never shipped to the client.
const token = process.env.SANITY_API_READ_TOKEN || undefined;

export const sanityClient = createClient({
  projectId: projectId!,
  dataset: dataset!,
  apiVersion,
  useCdn: !token,
  perspective: "published",
  ...(token ? { token } : {}),
});

const builder = createImageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImageSource): string {
  return builder.image(source).url();
}
