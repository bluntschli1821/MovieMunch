import { icons } from "@/constants/icons";
import React from "react";
import { Image, Text, View } from "react-native";

export default function profile() {
  return (
    <View className="bg-primary flex-1 px-10">
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Image source={icons.person} tintColor="#fff" />
        <Text className="text-gray-500 text-base font-bold">Profile</Text>
      </View>
    </View>
  );
}
