import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  TextInput,
  View,
  Pressable,
  Text,
} from "react-native";
import { auth } from "../../firebaseConfig";
import * as ImagePicker from "expo-image-picker";

export default function Cadastro({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");

  const [imagem, setImagem] = useState(null);

  const cadastrar = async () => {
    if (!email || !senha || !nome) {
      Alert.alert("Atenção", "Preecha todos os campos");
      return;
    }

    try {
      const contaUsuario = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );

      // Foto e nome do current userr
      if (contaUsuario.user) {
        // Fazer upload no firestore
        const urlImagem = await uploadImagemFirebaseStorage(imagem);

        // Atualize o perfil do usuário com o nome e a URL da imagem
        await updateProfile(auth.currentUser, {
          displayName: nome,
          photoURL: urlImagem,
        });
      }

      Alert.alert("Cadastro", " Seu cadastro foi concluido com sucesso!", [
        {
          style: "cancel",
          text: "Ficar aqui mesmo",
          onPress: () => {
            return;
          },
        },
        {
          style: "default",
          text: "Ir para a área logada ",
          onPress: () => navigation.replace("AreaLogada"),
        },
      ]);
    } catch (error) {
      console.error(error.code);
      let mensagem;
      switch (error.code) {
        case "auth/email-already-in-use":
          mensagem = "Email já existente!";
          break;
        case "auth/weak-password":
          mensagem = "Senha fraca!";
          break;
        case "auth/invalid-email":
          mensagem = "Endereço de e-mail inválido!";
          break;
        default:
          mensagem = "Houve um erro, tente mais tarde!";
          break;
      }
      Alert.alert("Ops!", mensagem);
    }

    const escolhaImagem = () => {
      ImagePicker.launchImageLibrary({ mediaType: "photo" }, (response) => {
        if (!response.didCancel) {
          setImagem(response.uri);
        }
      });
    };

    // Função para fazer upload da imagem para o Firebase Storage
    const uploadImagemFirebaseStorage = async (imagem) => {
      // Código para fazer upload da imagem para o Firebase Storage
      // Retorne a URL da imagem após o upload
    };
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.formulario}>
        {imagem && <Image source={{ uri: imagem }} style={styles.image} />}
        <Button title="Escolher Foto" />
        <TextInput
          placeholder="Nome"
          style={estilos.input}
          keyboardType="default"
          onChangeText={(valor) => setNome(valor)}
        />
        <TextInput
          placeholder="E-mail"
          style={estilos.input}
          keyboardType="email-address"
          onChangeText={(valor) => setEmail(valor)}
        />
        <TextInput
          placeholder="Senha"
          style={estilos.input}
          secureTextEntry
          onChangeText={(valor) => setSenha(valor)}
        />

        <View style={estilos.botoes}>
          <Pressable style={estilos.botaoCadastro} onPress={cadastrar}>
            <Text style={estilos.textoBotaoCadastro}>Cadastre-se</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formulario: {
    marginVertical: 16,
    width: "80%",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    width: "100%",
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
  },
  botoes: {
    marginVertical: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  botaoCadastro: {
    backgroundColor: "#4A235A",
    borderColor: "#4A235A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    marginHorizontal: 10,
  },
  textoBotaoCadastro: {
    color: "#E6E6FA",
  },
});
