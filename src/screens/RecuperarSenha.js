import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
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
        onChangeText={(valor) => setEmail(valor)}
        placeholder="E-mail"
        style={styles.input}
      />
      <Button title="Recuperar Senha" color="gray" onPress={recuperarSenha} />
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
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    width: "80%",
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
  },
});
