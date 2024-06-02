import { useSession } from "@/libs/auth/context";
import { Redirect, Slot } from "expo-router";

import { Text, View } from "react-native";

export default function AuthLayout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (auth) group's layout as users
  // need to be able to access the (app) group and sign in again.
  if (session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/" />;
  }
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
