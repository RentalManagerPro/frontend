import { StyledLink } from "@/components/StyledLink";
import { useSession } from "@/libs/auth/context";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import Credentials from "./components/Credentials";
import { CredentialsType, credentialsSchema } from "./schema";
import { useState } from "react";
import { Button } from "tamagui";

export default function SignIn() {
  const { signIn } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialsType>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(credentialsSchema),
  });

  const handleSignIn = async (data: CredentialsType) => {
    setIsLoading(true);
    try {
      const response = await signIn(data.username, data.password);
      router.replace("/");
    } catch (error) {
      // TODO: handle error and show error notification
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Credentials
        control={control}
        errors={errors}
        handleSubmit={handleSubmit(handleSignIn)}
        isLoading={isLoading}
        buttonTitle="SignIn"
      />
      <View className="flex flex-col items-center justify-center mt-2">
        <Text className="text-center">
          Don't have an account? <StyledLink href="/sign-up" label="Sign up" />
        </Text>
      </View>
    </>
  );
}
