import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabRoutes } from "./TabRoutes";
import { SignUpScreen } from "../screens/SignUpSreen";
import { LoginScreen } from "../screens/LoginScreen";
import { useAuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";

export type RootStakParamsList = {
  StackLoginScreen: undefined;
  StackTabHome: undefined;
  StackSignUpScreen: undefined;
};

export function StackRoutes() {
  const Stack = createNativeStackNavigator<RootStakParamsList>();

  const { user, loading } = useAuthContext();

  if (loading) {
    return <Loader />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="StackLoginScreen" component={LoginScreen} />
      ) : (
        <Stack.Screen name="StackTabHome" component={TabRoutes} />
      )}
      <Stack.Screen name="StackSignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
