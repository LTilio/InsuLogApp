import { useEffect, useState } from "react";
import { GlucoseLog } from "../@types/fireStore";
import {
  collection,
  DocumentData,
  orderBy,
  query,
  where,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import { db } from "../fireBase/Config";
import { useAuthContext } from "../context/AuthContext";

export const useFetchAllDocs = (docCollection: string, userId: string, pageSize: number = 5) => {
  const [documents, setDocuments] = useState<GlucoseLog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastDoc, setLastDoc] = useState<DocumentData | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { user } = useAuthContext();

  useEffect(() => {
    if (!userId || !user) return;

    const fetchDocuments = async () => {
      try {
        setLoading(true);
        // Cria a consulta inicial
        const initialQuery = query(
          collection(db, docCollection),
          where("userId", "==", userId),
          orderBy("createdAt", "desc"),
          limit(pageSize)
        );

        // Chama getDocs para buscar os documentos uma vez
        const snapshot = await getDocs(initialQuery);

        if (!snapshot.empty) {
          const docs = snapshot.docs.map((doc) => doc.data() as GlucoseLog);
          setDocuments(docs);
          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
          setHasMore(docs.length === pageSize);
        } else {
          setHasMore(false);
        }
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar documentos:", error);
        setError("Erro ao buscar documentos");
        setLoading(false);
      }
    };

    fetchDocuments();

    // Função de limpeza ao desmontar ou ao mudar o userId
    return () => {
      setDocuments([]);
      setLastDoc(null);
      setHasMore(true);
    };
  }, [docCollection, userId, pageSize, user]); // Quando userId ou user mudar, reexecuta o useEffect

  const fetchMoreDocs = async () => {
    if (!userId || !lastDoc || !hasMore || loading) return;

    try {
      setLoading(true);
      const nextQuery = query(
        collection(db, docCollection),
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(pageSize)
      );

      const snapshot = await getDocs(nextQuery);

      if (!snapshot.empty) {
        const newDocs = snapshot.docs.map((doc) => doc.data() as GlucoseLog);
        setDocuments((prevDocs) => [...prevDocs, ...newDocs]);
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
        setHasMore(newDocs.length === pageSize);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar mais documentos:", error);
      setError("Erro ao buscar mais documentos");
      setLoading(false);
    }
  };

  return { documents, loading, error, fetchMoreDocs, hasMore };
};
