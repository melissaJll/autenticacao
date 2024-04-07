import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { auth } from "../../firebaseConfig";
import { updateEmail, updateProfile } from "firebase/auth";

export default function Perfil() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const carregarUsuarioAtual = async () => {
      const usuarioAtual = auth.currentUser;
      if (usuarioAtual) {
        setNome(usuarioAtual.displayName || "");
        setEmail(usuarioAtual.email || "");
      }
    };

    carregarUsuarioAtual();
  }, []);

  const salvarPerfil = async () => {
    try {
      const usuarioAtual = auth.currentUser;

      if (!usuarioAtual) {
        throw new Error("Usuário não autenticado.");
      }

      // Atualizar o email do usuário
      await updateEmail(usuarioAtual, email);

      // Atualizar o nome do usuário
      await atualizarNome(nome);

      Alert.alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      Alert.alert(
        "Erro ao atualizar perfil. Por favor, tente novamente mais tarde."
      );
    }
  };

  const atualizarNome = async (novoNome) => {
    const usuarioAtual = auth.currentUser;
    if (!usuarioAtual) {
      throw new Error("Usuário não autenticado.");
    }
    await updateProfile(usuarioAtual, { displayName: novoNome });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
        keyboardType="email-address"
      />

      <Button title="Salvar" onPress={salvarPerfil} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "white",
    marginVertical: 8,
    padding: 8,
    borderRadius: 4,
    width: "80%",
  },
});
