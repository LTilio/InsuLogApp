import { useRef } from "react";
import { StyleSheet, TextInput } from "react-native";

type PropsComponent = {
  placeHolder: string;
  value: string;
  inputtype?: boolean;
  handleonChange: (value: string) => void;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  onFocus?: () => void;
};

export function InputComponent({
  handleonChange,
  placeHolder,
  value,
  inputtype,
  keyboardType,
  onFocus,
}: PropsComponent) {
  const inputRef = useRef<TextInput>(null);
  return (
    <>
      <TextInput
        ref={inputRef}
        style={styles.input}
        onChangeText={handleonChange}
        secureTextEntry={inputtype}
        value={value}
        placeholder={placeHolder}
        keyboardType={keyboardType}
        onFocus={onFocus}
      />
    </>
  );
}

export const styles = StyleSheet.create({
  input: {
    width: "90%",
    height: 55,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
    marginBottom: 15,
    fontSize: 16,
  },
});
