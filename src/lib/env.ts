export const AppWrite = {
    proyectID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    bucketID: import.meta.env.VITE_APPWRITE_TABLE_BUCKET_ID,

    collections: {
        products: import.meta.env.VITE_APPWRITE_TABLE_PRODUCTS_ID,
        profile: import.meta.env.VITE_APPWRITE_TABLE_PROFILE_ID
    }
}