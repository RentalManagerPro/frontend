import { FormField } from "@/components/FormField";
import { Control, FieldErrors } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { CredentialsType } from "../schema";

type CredentialsProps = {
  control: Control<CredentialsType>;
  errors: FieldErrors<CredentialsType>;
  isLoading: boolean;
  buttonTitle: string;
  handleSubmit: () => void;
};

export default function Credentials({
  control,
  errors,
  isLoading,
  buttonTitle,
  handleSubmit,
}: CredentialsProps) {
  return (
    <>
      <FormField
        name="username"
        control={control}
        label="E-mail"
        type="email"
        error={errors.username}
      />
      <FormField
        name="password"
        control={control}
        label="Password"
        type="text"
        isPassword
        error={errors.password}
      />
      <Pressable onPress={handleSubmit}>
        <View className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
          {isLoading ? (
            <Text className="text-white">Loading...</Text>
          ) : (
            <Text className="text-white ">{buttonTitle}</Text>
          )}
        </View>
      </Pressable>
    </>
  );
}
