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
    alignItems: "center",
    width: "95%",
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingLeft: 20,
    fontSize: 15,
  },
});
