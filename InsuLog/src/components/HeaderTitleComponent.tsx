import { Image, Text, View } from "react-native";
import logo from "../../assets/InsuLogLogo.png";

interface HeaderTitleProps {
  userName: string;
}

export const HeaderTitleComponent = ({ userName }: HeaderTitleProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image source={logo} style={{ width: 40, height: 40, marginRight: -2 }} />
        <Text style={{ fontSize: 18 }}>
          Insu
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Log</Text>
        </Text>
      </View>

      <Text style={{ fontWeight: "bold", fontSize: 16 }}>{userName}</Text>
    </View>
  );
};
