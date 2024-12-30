import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useReducer } from "react";
import { db } from "../fireBase/Config";
import { GlucoseLog } from "../@types/fireStore";

interface State {
  loading: boolean;
  error: string | null;
}

interface Action {
  type: "LOADING" | "ERROR" | "INSERTED";
  payload?: any;
}

const initialState = {
  loading: false,
  error: null,
};

const insertReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    case "INSERTED":
      return { ...state, loading: false, error: null };
    default:
      return state;
  }
};

export const useInsertDocument = (docCollection: string) => {
  const [state, dispatch] = useReducer(insertReducer, initialState);

  const minLoaderTime = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const insertDocument = async (doc: GlucoseLog) => {
    dispatch({ type: "LOADING" });
    await minLoaderTime(1000);

    try {
      const localDate = new Date(); // Gera a data no fuso horário local
      const newDocument = { ...doc, createdAt: Timestamp.fromDate(localDate) };
      const insertedDocument = await addDoc(collection(db, docCollection), newDocument);
      dispatch({ type: "INSERTED", payload: insertedDocument });
    } catch (error) {
      dispatch({ type: "ERROR", payload: (error as Error).message });
    }
  };

  return { insertDocument, state };
};
