import { FormField } from "@/components/FormField";
import { Control, FieldErrors } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { CredentialsType } from "../schema";
import { Button } from "tamagui";

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
      <Button
        theme="blue"
        disabled={isLoading}
        onPress={handleSubmit}
        opacity={isLoading ? 0.5 : 1}
      >
        {isLoading ? (
          <Text className="text-white">Loading...</Text>
        ) : (
          <Text className="text-white ">{buttonTitle}</Text>
        )}
      </Button>
    </>
  );
}
