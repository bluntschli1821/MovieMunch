// Track the search history

import { Client, Databases, Query } from "react-native-appwrite";
import { Platform } from "react-native";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
// const ENDPOOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchHistory = async (query: string, movie: Movie) => {
  const result = await database.listDocuments(COLLECTION_ID, DATABASE_ID, [
    Query.equal("searchTerm", query),
  ]);

  // check if a record of search exists in the local storage
  // if a record exists, update the record with the new movie data
  // if a record does not exist, create a new record with the movie data

  console.log(result);
};
