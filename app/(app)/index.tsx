import { useSession } from "@/libs/auth/context";
import { Text, View } from "react-native";

export default function Index() {
  const { signOut } = useSession();
  return (
    <View className="bg-gray-100 mx-auto">
      <Text
        className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full p-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
      >
        Sign Out
      </Text>
    </View>
  );
}
