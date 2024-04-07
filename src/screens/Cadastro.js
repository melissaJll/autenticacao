import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";
import { auth } from "../../firebase.config";

export default function Cadastro({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");

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

      if (contaUsuario.user) {
        await updateProfile(auth.currentUser, { displayName: nome });
        // teste user {displayName : "undefined"}
        console.log(contaUsuario.user);
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
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.formulario}>
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
          <Button onPress={cadastrar} title="Cadastre-se" color="blue" />
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
  formulario: {
    marginVertical: 16,
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    marginVertical: 8,
    padding: 8,
    borderRadius: 4,
  },
  botoes: {
    marginVertical: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
