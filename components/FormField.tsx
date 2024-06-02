import {
  Control,
  Controller,
  FieldError,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { InputModeOptions, Text, TextInput, View } from "react-native";

export function FormField<T extends FieldValues>({
  label,
  control,
  name,
  error,
  type,
  isPassword = false,
}: {
  label: string;
  control: Control<T>;
  name: FieldPath<T>;
  error?: FieldError;
  type: InputModeOptions;
  isPassword?: boolean;
}) {
  return (
    <View className="flex flex-col">
      <Text className="text-gray-500">{label}</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="border border-blue-500 rounded-lg px-3 py-2 my-2 text-sm w-full"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            inputMode={type}
            secureTextEntry={isPassword}
            underlineColorAndroid="transparent"
          />
        )}
        name={name}
      />
      {error && <Text className="text-red-500">{error.message}</Text>}
    </View>
  );
}
