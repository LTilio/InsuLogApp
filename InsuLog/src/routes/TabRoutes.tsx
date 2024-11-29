import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { HomeScreen } from "../screens/HomeScreen";
import { InfoScreen } from "../screens/InfoScreen";
import { LogoutScreen } from "../screens/LogoutScreen";
import { Keyboard } from "react-native";
import { useEffect, useState } from "react";

export type RootTabParamsList = {
  TabHomeScreen: undefined;
  TabInfo: undefined;
  TabLogout: undefined;
  // TabInfo: { name: string };
};

const tab = createBottomTabNavigator<RootTabParamsList>();

export function TabRoutes() {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

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
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          display: isKeyboardVisible ? "none" : "flex",
          // position: "absolute", // Fixa a TabBar na parte inferior
          // bottom: 0, // Garantir que a TabBar fique fixa na parte inferior
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
          tabBarIcon: () => <Feather name="home" size={35} color="black" />,
          title: "Home",
        }}
      />
      <tab.Screen
        name="TabInfo"
        component={InfoScreen}
        options={{
          tabBarIcon: () => <Feather name="alert-circle" size={35} color="black" />,
          title: "Info",
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
