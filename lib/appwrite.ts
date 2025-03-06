import { useState } from 'react';
import { Client, Account, ID, Models, Databases, Avatars, Storage, Query } from 'react-native-appwrite';

export const config = {
    platform: "com.ntmk.aora",
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    usersCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID,
    videosCollectionId: process.env.EXPO_PUBLIC_APPWRITE_VIDEOS_COLLECTION_ID,
    filesStorageId: process.env.EXPO_PUBLIC_APPWRITE_FILES_STORAGE_ID,
    };

export const client = new Client();
client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!)

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Register user
export async function createUser(email: string, password: string, username: string) {
    try {
      // The session check is now handled in GlobalProvider
      // We'll just delete any existing session to be safe
      try {
        await account.deleteSession('current');
      } catch (sessionError) {
        // No active session or error deleting session, proceed with registration
      }

      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
      );
  
      if (!newAccount) throw Error;
  
      const avatarUrl = avatars.getInitials(username);
      
      // Create a session
      await account.createEmailPasswordSession(email, password);
  
      const newUser = await databases.createDocument(
        config.databaseId!,
        config.usersCollectionId!,
        ID.unique(),
        {
          accountID: newAccount.$id,
          email: email,
          username: username,
          avatar: avatarUrl,
        }
      );
  
      return newUser;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }
  
// Sign In - Simplified as most logic is now in GlobalProvider
export async function signIn(email: string, password: string) {
    try {
      return await account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Sign in error:", error);
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }

// Get Account
async function getAccount() {
  try {
    return await account.get();
  } catch (error) {
    console.error("Get account error:", error);
    return null;
  }
}

// Get Current User
export async function getCurrentUser() {
    try {
      const currentAccount = await getAccount();
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        config.databaseId!,
        config.usersCollectionId!,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
// Sign Out - Simplified as most logic is now in GlobalProvider
export async function signOut() {
  try {
    return await account.deleteSession("current");
  } catch (error) {
    console.error("Sign out error:", error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}