import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Pressable,
  Image,
  StatusBar,
} from "react-native";
import { useState, useEffect } from "react";
import { auth } from "../../firebaseConfig";
import { updateEmail, updateProfile } from "firebase/auth";

import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Perfil() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [fotoPerfil, setfotoPerfil] = useState("");
  const storage = getStorage();

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

      //  Chamando a função para Atualizar o nome do usuário
      await atualizarNome(nome);

      // Chamando a função para tualizar a foto de perfil
      if (fotoPerfil) {
        await atualizarFotoPerfil(usuarioAtual.uid, fotoPerfil);
      }

      Alert.alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      Alert.alert(
        "Erro ao atualizar perfil. Por favor, tente novamente mais tarde."
      );
    }
  };

  // função chamada em salvar que altera o nome
  const atualizarNome = async (novoNome) => {
    const usuarioAtual = auth.currentUser;
    if (!usuarioAtual) {
      throw new Error("Usuário não autenticado.");
    }
    await updateProfile(usuarioAtual, { displayName: novoNome });
  };

  const escolhaImagem = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    // Se o resultado não for cancelado
    if (!resultado.canceled) {
      setfotoPerfil(resultado.assets[0].uri);
    }
  };

  const atualizarFotoPerfil = async (uid, fotoPerfil) => {
    try {
      const imagemRef = ref(storage, `fotosPerfil/${uid}`);
      // a imagem é carregada para o Firebase Storage com
      await uploadString(imagemRef, fotoPerfil.data, "data_url");

      // Pegando url de nova foto selecionada
      const fotoURL = await getDownloadURL(imagemRef);

      // Atualizar o nome do usuário com parametro que será state fotoUrl
      await updateProfile(auth.currentUser, { photoURL: fotoURL });
    } catch (error) {
      console.error("Erro ao atualizar foto de perfil:", error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#A8A0D0" />

      <View style={styles.containerFoto}>
        <Image
          source={{ uri: fotoPerfil || "https://via.placeholder.com/300" }}
          style={[styles.image, { borderRadius: 85, backgroundColor: "gray" }]}
        />
        <Pressable onPress={escolhaImagem} style={styles.botao}>
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
          style={[
            styles.input,
            { backgroundColor: "lightgray", borderColor: "#5F5E65" },
          ]}
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
    borderColor: "#8279BD",
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    width: 310,
    marginBottom: 16,
    color: "#333",
  },
  botao: {
    borderRadius: 4,
    marginTop: 20,
    borderColor: "#4631B4",
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  botaoText: {
    fontWeight: "bold",
    // color: "#fff",
  },
  image: {
    width: 170,
    height: 170,
    borderRadius: 50,
    marginTop: 20,
    marginLeft: 10,

    borderWidth: 4,
    borderRadius: 50,
    borderColor: "#EBE6F6",

    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 }, // Sombra para baixo (y = 5)
    shadowOpacity: 0.2,
  },
});
