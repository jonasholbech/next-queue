export const IS_SERVER = typeof window === "undefined";
export const IS_LIVE = process.env.VERCEL_URL;

export function getAbsoluteUrl() {
  //get absolute url in client/browser
  if (!IS_LIVE) {
    return `http://localhost:3000`;
  } else {
    return `https://${process.env.VERCEL_URL}`;
  }
}
