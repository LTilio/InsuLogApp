import { RootStakParamsList } from "./StackRoutes";
import { RootTabParamsList } from "./TabRoutes";

declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStakParamsList {}
      interface RootParamList extends RootTabParamsList {}
    }
  }