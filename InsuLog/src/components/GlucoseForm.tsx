import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";

const schema = yup.object().shape({
  glucose: yup
    .number()
    .required("Campo obrigatorio")
    .min(30, "O valor deve ser maior ou igual a 30")
    .max(1000, "O valor deve ser menor que 1000")
    .positive("Menor numero é 0"),

  insulinUsed: yup
    .string()
    .required("Selecione uma opção")
    .oneOf(["Rápida", "Lenta", "Não ultilizada"], "Tipo inválido"),

  insulinAmount: yup
    .number()
    .required("Campo obrigatorio")
    .max(100.0, "O valor maximo é de 100.0")
    .min(0, "Menor numero é 0")
    .typeError("Valor inválido"),
});

interface FormProps {
  handleSubmitForm: (data: any, resetForm: () => void) => void;
  loading: boolean;
}

export function GlucoseForm({ handleSubmitForm, loading }: FormProps) {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    handleSubmitForm(data, reset);
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Nível de glicose:</Text>
      <Controller
        control={control}
        name="glucose"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.glucose && styles.inputError]}
            placeholder={errors.glucose ? errors.glucose.message : "Valor da Glicose"}
            value={value?.toString() || ""}
            onChangeText={(v) => {
              const formattedValue = v.replace(/[^0-9]/g, "");
              onChange(formattedValue);
            }}
            keyboardType="numeric"
            placeholderTextColor={errors.glucose ? "#dc3554" : "#888"}
          />
        )}
      />

      <Text style={styles.label}>Tipo de insulina usada:</Text>
      <Controller
        control={control}
        name="insulinUsed"
        render={({ field: { onChange, value } }) => (
          <View style={[styles.pickerContainer, errors.insulinUsed && styles.inputError]}>
            <Picker
              selectedValue={value}
              onValueChange={(v) => {
                onChange(v);
                if (v === "Não ultilizada") {
                  setValue("insulinAmount", 0);
                }
              }}
              style={[styles.picker, errors.insulinUsed && styles.inputErrorText]}
            >
              <Picker.Item label="Selecione um tipo" value="" />
              <Picker.Item label="Rápida" value="Rápida" />
              <Picker.Item label="Lenta" value="Lenta" />
              <Picker.Item label="Não ultilizada" value="Não ultilizada" />
            </Picker>
          </View>
        )}
      />

      <Text style={styles.label}>Quantidade:</Text>
      <Controller
        control={control}
        name="insulinAmount"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.insulinAmount && styles.inputError]}
            placeholder={errors.insulinAmount ? errors.insulinAmount.message : "Quantidade de insulina usada"}
            value={value?.toString() || ""}
            onChangeText={(v) => {
              const formattedValue = v.replace(/[^0-9.]/g, "");
              onChange(formattedValue);
            }}
            keyboardType="decimal-pad"
            placeholderTextColor={errors.insulinAmount ? "#dc3554" : "#888"}
          />
        )}
      />

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
        style={[styles.submitButton, loading && styles.submitButtonDisabled]}
      >
        <Text style={styles.submitButtonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "90%",
    padding: 25,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 1,
  },
  input: {
    width: "100%",
    height: 55,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
    marginBottom: 15,
    fontSize: 16,
  },
  inputError: {
    borderColor: "#dc3554",
  },
  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
    marginBottom: 15,
    overflow: "hidden",
  },
  picker: {
    height: 55,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  inputErrorText: {
    color: "#dc3554",
  },
  errorText: {
    color: "#dc3554",
    fontSize: 14,
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#000",
    alignItems: "center",
    width: "100%",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  submitButtonDisabled: {
    backgroundColor: "#ccc",
  },
});
