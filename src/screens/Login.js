import { Alert, Button, StyleSheet, TextInput, View } from "react-native";
import { auth, provider } from "../../firebaseConfig";
import { signInWithCredential } from "firebase/auth";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  //   GoogleSignin.configure({
  //     //   Insira o seu Web Client ID aqui
  //     webClientId: "cycletrack-ts.firebaseapp.com",
  //   });
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [emailGoogle, setEmailGoogle] = useState("");

  const login = async () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preecha email e senha");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigation.replace("AreaLogada");
    } catch (error) {
      console.error(error.code);
      let mensagem;
      switch (error.code) {
        case "auth/invalid-credential":
          mensagem = "Dados inválidos!";
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
    <>
      <View style={estilos.container}>
        <View style={estilos.formulario}>
          <TextInput
            onChangeText={(valor) => setEmail(valor)}
            placeholder="E-mail"
            style={estilos.input}
          />
          <TextInput
            onChangeText={(valor) => setSenha(valor)}
            placeholder="Senha"
            style={estilos.input}
            secureTextEntry
          />
          <View style={estilos.botoes}>
            <Button onPress={login} title="Entre" color="green" />
            <Button
              title="Recuperar Senha"
              color="gray"
              onPress={() => navigation.navigate("RecuperarSenha")}
            ></Button>
          </View>
        </View>
      </View>
    </>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center",
  },
  formulario: {
    marginBottom: 32,
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
