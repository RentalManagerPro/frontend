import { TamaguiProvider, createTamagui } from "tamagui";

import { config } from "@tamagui/config/v3";
import { PropsWithChildren } from "react";

const tamaguiConfig = createTamagui(config);

type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
export default ({ children }: PropsWithChildren) => {
  return <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>;
};
