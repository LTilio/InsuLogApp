import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { HomeScreen } from "../screens/HomeScreen";
import { InfoScreen } from "../screens/InfoScreen";
import { LogoutScreen } from "../screens/LogoutScreen";
import { Keyboard } from "react-native";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { HeaderTitleComponent } from "../components/HeaderTitleComponent";

export type RootTabParamsList = {
  TabHomeScreen: undefined;
  TabInfo: undefined;
  TabLogout: undefined;
  // TabInfo: { name: string };
};

const tab = createBottomTabNavigator<RootTabParamsList>();

export function TabRoutes() {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <tab.Navigator
      initialRouteName="TabHomeScreen"
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          display: isKeyboardVisible ? "none" : "flex",
          height: 80,
          borderTopWidth: 0,
          elevation: 0,
          zIndex: 1,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarIconStyle: {
          alignSelf: "center",
          width: "100%",
          height: "100%",
        },
      }}
    >
      <tab.Screen
        name="TabHomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: () => <HeaderTitleComponent userName={user?.displayName || "Nome do Usuário"} />,
          tabBarIcon: () => <Feather name="home" size={35} color="black" />,
          title: "Home",
        }}
      />
      <tab.Screen
        name="TabInfo"
        component={InfoScreen}
        options={{
          headerTitle: () => <HeaderTitleComponent userName={"Historico"} />,
          tabBarIcon: () => <Feather name="alert-circle" size={35} color="black" />,
          title: "Historico",
        }}
      />
      <tab.Screen
        name="TabLogout"
        component={LogoutScreen}
        options={{
          tabBarIcon: () => <Feather name="log-out" size={35} color="black" />,
          title: "Sair",
        }}
      />
    </tab.Navigator>
  );
}
