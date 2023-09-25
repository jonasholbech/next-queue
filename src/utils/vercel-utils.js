export const IS_SERVER = typeof window === "undefined";
export const IS_LOCAL = process.env.NODE_ENV === "production" ? false : true;

export function getAbsoluteUrl() {
  //get absolute url in client/browser
  if (IS_LOCAL) {
    return `http://localhost:3000`;
  } else {
    return `https://${process.env.VERCEL_URL}`;
  }
}
