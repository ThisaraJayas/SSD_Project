/// <reference types="vite/client" />
export {}; // make this a module so global augmentation works

declare global {
  interface ImportMetaEnv {
    readonly VITE_API_URL: string; // your custom var(s)
    // (optional) allow any other VITE_ keys without errors:
    // [key: string]: any;
  }
}
