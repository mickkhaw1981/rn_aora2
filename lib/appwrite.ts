import { useState } from 'react';
import { Client, Account, ID, Models, Databases, Avatars, Storage } from 'react-native-appwrite';

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
      

      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
      );
  
      if (!newAccount) throw Error;
  
      const avatarUrl = avatars.getInitials(username);
  
      // Check for existing session and delete it before creating a new one
      try {
        const currentSession = await account.getSession('current');
        if (currentSession) {
          await account.deleteSession('current');
        }
      } catch (error) {
        // No active session exists, which is fine
      }
      
      await signIn(email, password);
  
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
  
// Sign In
export async function signIn(email: string, password: string) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
  
      return session;
    } catch (error) {
      console.error("Sign in error:", error);
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }
  