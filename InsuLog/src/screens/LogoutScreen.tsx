import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

export function LogoutScreen() {
  const { logOut } = useAuthContext();

  useEffect(() => {
    const handleLogout = async () => {
      await logOut(); // Realiza o logout e limpa o estado do usuário
    };

    handleLogout();
  }, [logOut]);

  return null;
}
