import MovieCard from "@/components/movieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import { useFetch } from "@/services/useFetch";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Search() {
  const [query, setQuery] = useState("");

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: query }));

  // 1. Fetch movies when query changes
  useEffect(
    () => {
      const timeoutId = setTimeout(async () => {
        if (query.trim()) {
          await loadMovies();
        } else {
          reset();
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    },
    // @ts-ignore
    [query]
  );

  // 2. Update search count only when movies change and query is valid
  useEffect(() => {
    if (query.trim() && movies && movies.length > 0) {
      updateSearchCount(query, movies[0]);
    }
  }, [query, movies]);

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
