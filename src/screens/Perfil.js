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
      <View style={styles.containerFoto}>
        <Image
          source={{ uri: "https://via.placeholder.com/300" || profilePicture }}
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

      <Button title="Salvar" onPress={salvarPerfil} />
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
    backgroundColor: "#f4f4f4",
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
  botao: {
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
  },
  botaoText: {
    color: "white",
    fontWeight: "bold",
  },
  image: {
    width: 170,
    height: 170,
    borderRadius: 50,
    marginTop: 20,
    // marginRight: 10,
  },
});
