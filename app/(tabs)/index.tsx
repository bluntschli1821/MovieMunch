import MovieCard from "@/components/movieCard";
import SearchBar from "@/components/SearchBar";
import TrendingMCard from "@/components/TrendingCard";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendigMovies } from "@/services/appwrite";
import { useFetch } from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendigMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={images.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        ) : moviesError || trendingError ? (
          <Text>Error : {moviesError?.message || trendingError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onChangeText={() => {}}
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
              value=""
            />

            {trendingMovies && (
              <View className="flex-1 mt-10">
                <Text className="text-lg text-white font-bold, mb-3">
                  Trending Movies
                </Text>

                <FlatList
                  data={trendingMovies}
                  keyExtractor={(item) => item.movie_id.toString()}
                  className="mt-3 mb-4"
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  renderItem={({ item, index }) => (
                    <TrendingMCard movie={item} index={index} />
                  )}
                />
              </View>
            )}

            <>
              <Text className="text-lg text-white font-bold, mt-5 mb-3">
                Latest Movies
              </Text>

              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
