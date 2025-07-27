import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { images } from "@/constants/images";

export default function MovieCard({
  id,
  title,
  poster_path,
  vote_average,
  release_date,
}: Movie) {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={
            poster_path
              ? { uri: `https://image.tmdb.org/t/p/w500${poster_path}` }
              : images.none
          }
          className="w-full h-52 rounded-lg"
          resizeMode="stretch"
        />
        <Text className="text-sm text-white font-bold mt-2 line-clamp-1">
          {title}
        </Text>

        <View className="flex-row itens-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-white text-xs font-bold uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          {/* Movies Release Date */}
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split("-")[0] || "Unknown"}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
