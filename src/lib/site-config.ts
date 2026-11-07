export const SITE_ORIGIN = "https://daftar-cpns.com";
export const OPERATOR_NAME = "Perawat Center";
export const CONTACT_EMAIL = "support@perawatcenter.com";
export function canonicalUrl(path: string) {
  if (!path.startsWith("/") || path.startsWith("//"))
    throw new Error("Expected site-relative path");
  return new URL(path, SITE_ORIGIN).href;
}
