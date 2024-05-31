import { StyledLink } from "@/components/StyledLink";
import { useSession } from "@/libs/auth/context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FormField } from "@/components/FormField";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SignUpInput, signUpInputSchema } from "./schema";
import { useState } from "react";
import Credentials from "./components/Credentials";
import ConfirmationCode from "./components/ConfirmationCode";

enum SignUpStep {
  Credentials,
  ConfirmationCode,
}

const signUpSteps = [
  {
    label: "Credentials",
    component: Credentials,
  },
  {
    label: "Confirmation Code",
    component: ConfirmationCode,
  },
];

export default function SignIn() {
  const { signUp, isLoading } = useSession();
  const [signUpStep, setSignUpStep] = useState<SignUpStep>(
    SignUpStep.Credentials
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    defaultValues: {
      username: "bartlomiej.mikolajczuk+test@outlook.com",
      password: "Password!23",
    },
    resolver: zodResolver(signUpInputSchema),
  });
  const onSubmit = async (data: SignUpInput) => {
    try {
      const response = await signUp(data.username, data.password);
      console.log(response);
      setSignUpStep(SignUpStep.ConfirmationCode);
    } catch (error) {
      // TODO: handle error and show error notification
      console.error(error);
    }
  };
  return (
    <>
      {signUpSteps[signUpStep].component({
        control,
        errors,
        isLoading,
        handleSubmit: handleSubmit(onSubmit),
      })}
      <View className="flex flex-col items-center justify-center">
        <Text className="text-center">
          Already have an account?{" "}
          <StyledLink href="/sign-in" label="Sign in" />
        </Text>
      </View>
    </>
  );
}
