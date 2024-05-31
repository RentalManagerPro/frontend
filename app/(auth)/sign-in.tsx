import { StyledLink } from "@/components/StyledLink";
import { useSession } from "@/libs/auth/context";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableWithoutFeedback, View } from "react-native";

export default function SignIn() {
  const { signIn, isLoading } = useSession();
  const [username, setUsername] = useState("admin@example.com");
  const [password, setPassword] = useState("Passw0rd!");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setError("");
    // validate username and password is set
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    await signIn(username, password);
    router.replace("/");
  };
  return (
    <>
      <Text className="font-semibold text-sm text-gray-600 pb-1 block">
        E-mail
      </Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
      />
      <Text className="font-semibold text-sm text-gray-600 pb-1 block">
        Password
      </Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
      />
      <TouchableWithoutFeedback onPress={handleSignIn}>
        <View className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
          {isLoading ? (
            <Text className="text-white">Loading...</Text>
          ) : (
            <Text className="text-white ">Login</Text>
          )}
        </View>
      </TouchableWithoutFeedback>
      {error && <Text className="text-red-500 mt-2">{error}</Text>}
      <Text className="py-2 text-center">
        Do no have an account yet?{" "}
        <StyledLink href="/sign-up" label="Sign Up" />
      </Text>
    </>
  );
}
