export const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
  usersTable: process.env.NEXT_PUBLIC_APPWRITE_USERS_TABLE!,
  filesTable: process.env.NEXT_PUBLIC_APPWRITE_FILES_TABLES!,
  bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET!,
  apiKey: process.env.NEXT_PUBLIC_APPWRITE_KEY!,
};
