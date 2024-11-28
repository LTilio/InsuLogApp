import { useEffect } from "react";
import { Loader } from "../components/Loader";
import { useAuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export function LogoutScreen() {
  const { logOut } = useAuthContext();

  useEffect(() => {
    const handleLogout = async () => {
      await logOut();
    };

    handleLogout();
  }, []);

  return <Loader />;
}
