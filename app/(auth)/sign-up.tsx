import { StyledLink } from "@/components/StyledLink";
import { useSession } from "@/libs/auth/context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CodeDeliveryDetails } from "aws-amplify/auth";
import { useState } from "react";
import { Text, View } from "react-native";
import ConfirmationCode from "./components/ConfirmationCode";
import Credentials from "./components/Credentials";
import { CredentialsType, credentialsSchema } from "./schema";

enum SignUpStep {
  Credentials,
  ConfirmationCode,
}

export default function SignIn() {
  const { signUp } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [codeDeliveryDetails, setCodeDeliveryDetails] =
    useState<CodeDeliveryDetails>({
      deliveryMedium: "EMAIL",
      destination: "",
      attributeName: "email",
    });
  const [signUpStep, setSignUpStep] = useState<SignUpStep>(
    SignUpStep.Credentials
  );
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CredentialsType>({
    defaultValues: {
      username: "bartlomiej.mikolajczuk+test@outlook.com",
      password: "Password!23",
    },
    resolver: zodResolver(credentialsSchema),
  });
  const onSubmit = async (data: CredentialsType) => {
    setIsLoading(true);
    try {
      const response = await signUp(data.username, data.password);
      console.log(response);
      setSignUpStep(SignUpStep.ConfirmationCode);
    } catch (error) {
      // TODO: handle error and show error notification
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {(signUpStep === SignUpStep.Credentials && (
        <Credentials
          control={control}
          errors={errors}
          handleSubmit={handleSubmit(onSubmit)}
          isLoading={isLoading}
          buttonTitle="SignUp"
        />
      )) ||
        (signUpStep === SignUpStep.ConfirmationCode && (
          <ConfirmationCode
            codeDeliveryDetails={codeDeliveryDetails}
            getValues={getValues}
          />
        ))}
      <View className="flex flex-col items-center justify-center mt-2">
        <Text className="text-center">
          Already have an account?{" "}
          <StyledLink href="/sign-in" label="Sign in" />
        </Text>
      </View>
    </>
  );
}
