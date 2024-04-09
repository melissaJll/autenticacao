import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { auth } from "../../firebaseConfig";
import { updateEmail, updateProfile } from "firebase/auth";

export default function Perfil() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [fotoPerfil, setfotoPerfil] = useState("");

  useEffect(() => {
    const carregarUsuarioAtual = async () => {
      const usuarioAtual = auth.currentUser;
      if (usuarioAtual) {
        setNome(usuarioAtual.displayName || "");
        setEmail(usuarioAtual.email || "");
        setfotoPerfil(usuarioAtual.photoURL || "");
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
      <View style={styles.containerFoto}>
        <Image
          source={{ uri: fotoPerfil || "https://via.placeholder.com/300" }}
          style={[styles.image, { borderRadius: 85, backgroundColor: "gray" }]}
        />
        <Pressable style={styles.botao}>
          <Text style={styles.botaoText}>Selecionar foto de perfil</Text>
        </Pressable>
      </View>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Nome"
        />
        <TextInput
          style={[styles.input, { backgroundColor: "lightgray" }]}
          value={email}
          placeholder="E-mail"
          editable={false}
        />
      </View>
      <Pressable style={styles.botao} onPress={salvarPerfil}>
        <Text>Salvar</Text>
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
  containerInput: {
    marginTop: 80,
  },
  // containerFoto: {
  //   flexDirection: "row",
  //   alignItems: "center",
  // },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    width: 310,
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
  },
  botao: {
    backgroundColor: "eee",
    borderRadius: 4,
    marginTop: 20,
    borderColor: "#4631B4",
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  botaoText: {
    fontWeight: "bold",
  },
  image: {
    width: 170,
    height: 170,
    borderRadius: 50,
    marginTop: 20,
    marginLeft: 10,
  },
});
