import { useSession } from "@/libs/auth/context";
import {
  CodeDeliveryDetails,
  SignUpInput,
  confirmSignUp,
} from "aws-amplify/auth";
import { router } from "expo-router";
import { useState } from "react";
import { UseFormGetValues } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";

type ConfirmationCodeProps = {
  codeDeliveryDetails: CodeDeliveryDetails;
  getValues: UseFormGetValues<SignUpInput>;
};

export default function ConfirmationCode({
  codeDeliveryDetails,
  getValues,
}: ConfirmationCodeProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useSession();
  const [code, setCode] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await confirmSignUp({
        username: getValues("username"),
        confirmationCode: code,
      });
      console.log(response);
      if (response.isSignUpComplete) {
        await signIn(getValues("username"), getValues("password"));
        router.replace("/");
      }
    } catch (error) {
      // TODO: handle error and show error notification
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Text>
        We have sent you a confirmation code to email address{" "}
        {codeDeliveryDetails.destination}.
      </Text>
      <TextInput
        className="border border-blue-500 rounded-lg px-3 py-2 my-2 text-sm w-full"
        placeholder="Confirmation code"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="numeric"
        onChangeText={setCode}
        value={code}
      />
      <Pressable onPress={handleSubmit}>
        <View className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
          {isLoading ? (
            <Text className="text-white">Loading...</Text>
          ) : (
            <Text className="text-white ">Confirm</Text>
          )}
        </View>
      </Pressable>
    </>
  );
}
