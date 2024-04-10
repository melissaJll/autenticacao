import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Pressable,
  Text,
} from "react-native";
import { sendPasswordResetEmail } from "firebase/auth"; // Importe o método sendPasswordResetEmail corretamente
import { auth } from "../../firebaseConfig";

export default function RecuperarSenha() {
  const [email, setEmail] = useState("");

  const recuperarSenha = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Recuperar senha", "Verifique seu e-mail.");
    } catch (error) {
      console.error(error.code);
      Alert.alert("Erro", "Ocorreu um erro ao recuperar a senha.");
    }
    setEmail(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        keyboardType="email-address"
        onChangeText={(valor) => setEmail(valor)}
        placeholder="E-mail"
        style={styles.input}
      />
      <Pressable onPress={recuperarSenha} style={styles.botao}>
        <Text style={styles.textoBotao}>Recuperar Senha</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "#3D2498",
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 15,
    width: "80%",
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
  },
  botao: {
    backgroundColor: "#3D2498",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  textoBotao: {
    color: "#E6E6FA",
    fontSize: 16,
    fontWeight: "bold",
  },
});
