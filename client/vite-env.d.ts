/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SESAMI_READ_API_KEY: string;
    readonly VITE_SESAMI_READ_CLIENT_ID: string;
    readonly VITE_SESAMI_WRITE_API_KEY: string;
    readonly VITE_SESAMI_WRITE_CLIENT_ID: string;
    readonly VITE_SESAMI_ADMIN_SHOP_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
