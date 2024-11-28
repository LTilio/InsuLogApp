import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PropsComponent {
    title: string;
    handleOnChange: () => void;
    disable?: boolean;
  }
  
  export function ButtonComponent({
    handleOnChange,
    title,
    disable,
  }: PropsComponent) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleOnChange}
          style={styles.button}
          disabled={disable}
        >
          <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  export const styles = StyleSheet.create({
    button: {
      width: '95%',
      height: 55,
      borderRadius: 50,
      borderColor: '#000',
      borderWidth: 1,
      marginTop: 45,
      marginBottom: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff'
    },
  
    text: {
      color: '#000',
      fontSize: 25
    },
  
    container:{
      alignItems: 'center',
      width: '100%',
      height: 'auto',
    },
  });