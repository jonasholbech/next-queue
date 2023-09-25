export const IS_SERVER = typeof window === "undefined";
export const IS_DEV = process.env.NODE_ENV === "development";
/* export function getProtocol() {
  const isProd = process.env.VERCEL_ENV === "production";
  if (isProd) return "https://";
  return "http://";
} */
export function getAbsoluteUrl() {
  //get absolute url in client/browser
  if (IS_DEV) {
    return `http://localhost:3000`;
  } else {
    return `https://${process.env.VERCEL_URL}`;
  }
}
