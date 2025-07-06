import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/movieCard";
import { useFetch } from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { updateSearchHistory } from "@/services/appwrite";

export default function Search() {
  const [query, setQuery] = useState("");

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: query }));

  useEffect(() => {
    updateSearchHistory(query, movies[0]); // Update search history when query changes

    const timeoutId = setTimeout(async () => {
      if (query.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0 flex-1 "
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        className="px-5"
        contentContainerStyle={{ paddingBottom: 100 }}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          paddingRight: 5,
          marginBottom: 10,
          marginVertical: 20,
        }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center items-center mt-20">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className=" my-5">
              <SearchBar
                value={query}
                placeholder="Search movies..."
                onChangeText={(text: string) => setQuery(text)}
              />
            </View>

            {moviesLoading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            )}

            {moviesError && (
              <Text className="text-red-500 px-5 my-3">
                Error: {moviesError?.message}
              </Text>
            )}

            {!moviesLoading &&
              !moviesError &&
              query.trim() &&
              movies?.length > 0 && (
                <Text className="text-white text-xl font-bold">
                  {/* Search Results for {movies?.[0]?.title} */}
                  Search Results for {``}
                  <Text className="text-accent">{query}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-white">
                {query.trim() ? "No movies found" : "Search For A Movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}
