import { Slot } from "expo-router";

import { View } from "react-native";

export default function AuthLayout() {
  return (
    <View className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <View className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <View className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <View className="px-5 py-7">
            <Slot />
          </View>
        </View>
      </View>
    </View>
  );
}
