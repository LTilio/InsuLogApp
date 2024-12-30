import { useEffect, useState } from "react";
import { GlucoseLog } from "../@types/fireStore";
import { collection, getDocs, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../fireBase/Config";

interface UseFetchDocumentProps {
  docCollection: string;
  userId: string;
}

export function useFetchLatestDoc({ docCollection, userId }: UseFetchDocumentProps) {
  const [document, setDocument] = useState<GlucoseLog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    // Prepara a consulta
    const docQuery = query(
      collection(db, docCollection),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(1)
    );

    const fetchData = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(docQuery);

        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data() as GlucoseLog;
          setDocument(docData);
        } else {
          setDocument(null); // Caso não haja nenhum documento
        }
        setLoading(false);
      } catch (err) {
        setError("Erro ao buscar o documento");
        setLoading(false);
      }
    };

    fetchData(); // Executa a busca

    // Não é necessário limpar a inscrição, pois estamos usando um método pontual
  }, [userId, docCollection]);

  return { document, loading, error };
}
