import { Text, View } from "@/components/Themed";
import { useSession } from "@/libs/auth/context";
import { router } from "expo-router";

export default function SignIn() {
  const { signIn, isLoading } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={async () => {
          await signIn("admin@example.com", "Passw0rd!");
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace("/");
        }}
      >
        Sign In
      </Text>
      {isLoading && <Text>Loading...</Text>}
    </View>
  );
}
