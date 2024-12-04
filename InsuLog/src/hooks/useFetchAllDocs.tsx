import { useEffect, useState } from "react";
import { GlucoseLog } from "../@types/fireStore";
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  where,
  limit,
  startAfter,
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
    // Se não houver userId, desinscreve o listener
    if (!userId) return;
    if (!user) return;
    // Cria a consulta inicial para buscar os primeiros documentos
    const initialQuery = query(
      collection(db, docCollection),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(pageSize)
    );

    // Configura um listener em tempo real usando onSnapshot
    const unsubscribe = onSnapshot(
      initialQuery,
      (snapshot: QuerySnapshot<DocumentData>) => {
        if (!snapshot.empty) {
          const docs = snapshot.docs.map((doc) => doc.data() as GlucoseLog);
          setDocuments(docs);
          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
          setHasMore(docs.length === pageSize);
        } else {
          setHasMore(false);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Erro ao buscar documentos:", error);
        setError("Erro ao buscar documentos");
        setLoading(false);
      }
    );

    // Função de limpeza ao desmontar ou ao mudar o userId
    return () => {
      unsubscribe();
      setDocuments([]); // Limpa os documentos ao fazer logout ou ao mudar o userId
      setLastDoc(null); // Limpa o lastDoc ao fazer logout
      setHasMore(true); // Reseta o estado de "hasMore"
    };
  }, [docCollection, userId, pageSize]); // Quando userId mudar, reexecuta o useEffect

  const fetchMoreDocs = () => {
    if (!userId || !lastDoc || !hasMore || loading) return;
    if (!user) return;
    setLoading(true);

    const nextQuery = query(
      collection(db, docCollection),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(pageSize)
    );

    onSnapshot(
      nextQuery,
      (snapshot: QuerySnapshot<DocumentData>) => {
        if (!snapshot.empty) {
          const newDocs = snapshot.docs.map((doc) => doc.data() as GlucoseLog);
          setDocuments((prevDocs) => [...prevDocs, ...newDocs]);
          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
          setHasMore(newDocs.length === pageSize);
        } else {
          setHasMore(false);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Erro ao buscar mais documentos:", error);
        setError("Erro ao buscar mais documentos");
        setLoading(false);
      }
    );
  };

  return { documents, loading, error, fetchMoreDocs, hasMore };
};
