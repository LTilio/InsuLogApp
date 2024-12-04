import { useEffect, useState } from "react";
import { GlucoseLog } from "../@types/fireStore";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { db } from "../fireBase/Config";
import { useAuth } from "./useAuth";
import { useAuthContext } from "../context/AuthContext";

export const useFetchLatestDoc = (docCollection: string, userId: string) => {
  const [document, setDocument] = useState<GlucoseLog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const{user}= useAuthContext();

  useEffect(() => {
    // Evitar execução se userId não estiver disponível
    if (!userId) return;
    if (!user) return;
    // Função para carregar o documento mais recente
    const loadLatestDoc = () => {
      
      const docQuery = query(
        collection(db, docCollection),
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
        limit(1)
      );

      // Iniciar o snapshot listener
      const unsubscribe = onSnapshot(
        docQuery,
        (snapshot: QuerySnapshot<DocumentData>) => {
          if (!snapshot.empty) {
            const docData = snapshot.docs[0].data() as GlucoseLog;
            setDocument(docData); // Atualizar o estado com o último documento
          } else {
            setDocument(null); // Nenhum documento encontrado
          }
          setLoading(false); // Finalizar o estado de carregamento
        },
        (error) => {
          console.error("Erro ao buscar o documento:", error);
          setError("Erro ao buscar o documento");
          setLoading(false); // Finalizar o estado de carregamento em caso de erro
        }
      );

      // Limpeza: desinscrever listener quando o componente desmontar
      return unsubscribe;
    };

    // Chama a função para carregar o documento mais recente
    const unsubscribe = loadLatestDoc();

    // Limpeza no retorno do useEffect
    return () => unsubscribe();
  }, [docCollection, userId]); // Dependências para quando a coleção ou userId mudarem

  return { document, loading, error };
};
