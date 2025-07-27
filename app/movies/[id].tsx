import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import { useFetch } from "@/services/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface FullMovieDetailsProps {
  label: string;
  value: string | number | null;
}

const FullMovieDetails = ({ label, value }: FullMovieDetailsProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

export default function MovieDetails() {
  const { id } = useLocalSearchParams();

  const { data: movie } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w=full h-[550px]"
            resizeMode="stretch"
          />
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">{movie?.title}</Text>

          <View className="flex-row items-center gap-x-3 mt-2">
            <Text className="text-light-200 text-sm">
              Year: {movie?.release_date?.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm">
              RunTime: {movie?.runtime}m
            </Text>
          </View>

          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-2 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>

          <FullMovieDetails label="Overview" value={movie?.overview ?? ""} />
          <FullMovieDetails
            label="Genres"
            value={
              movie?.genres?.length
                ? movie.genres.map((g) => g.name).join("-")
                : null
            }
          />
          <View className="flex flex-row justify-between w-1/2">
            <FullMovieDetails
              label="Budget"
              value={
                movie?.budget !== undefined && movie?.budget !== null
                  ? `$${movie.budget / 1_000_000} million`
                  : "N/A"
              }
            />

            <FullMovieDetails
              label="Revenue"
              value={`$${Math.round(movie?.revenue ?? 0) / 1_000_000} million`}
            />
          </View>

          <FullMovieDetails
            label="Production Companies"
            value={
              movie?.production_companies?.length
                ? movie.production_companies.map((c) => c.name).join(", ")
                : "N/A"
            }
          />

          {/* <Text className="text-white text-base mt-2">{movie?.overview}</Text> */}
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute bottom-5 left-0 right-0 mx-5  px-3 py-3.5 rounded-lg bg-accent flex flex-row itens-center justify-center z-50"
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white text-base font-semibold">Back</Text>
      </TouchableOpacity>
    </View>
  );
}
