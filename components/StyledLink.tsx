import { Link, LinkProps } from "expo-router";
import { Text } from "react-native";

export function StyledLink<T>({
  className,
  label,
  href,
}: {
  className?: string;
  label: string;
} & React.PropsWithChildren<LinkProps<T>>) {
  return (
    <Link href={href}>
      <Text
        className={`text-blue-500 no-underline hover:underline ${
          className ? className : ""
        }`}
      >
        {label}
      </Text>
    </Link>
  );
}
