import { Alert, Button, StyleSheet, TextInput, View } from "react-native";
import { auth, provider } from "../../firebaseConfig";
import { signInWithCredential } from "firebase/auth";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import Inicial from "./Inicial";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function Login({ navigation }) {
  //   GoogleSignin.configure({
  //     //   Insira o seu Web Client ID aqui
  //     webClientId: "cycletrack-ts.firebaseapp.com",
  //   });

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailGoogle, setEmailGoogle] = useState("");

  //   const loginGoogle = async () => {
  //     try {
  //       await GoogleSignin.hasPlayServices();
  //       const userInfo = await GoogleSignin.signIn();
  //       setEmailGoogle(userInfo.user.email);
  //       await AsyncStorage.setItem("email", userInfo.user.email);
  //       // Após o login com sucesso, você pode realizar ações como salvar o email do usuário ou navegar para outra tela
  //       navigation.replace("AreaLogada");
  //     } catch (error) {
  //       console.error("Erro ao fazer login com o Google:", error);
  //     }
  //   };

  const login = async () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preecha email e senha");
      return;
    }
    try {
      signInWithEmailAndPassword(auth, email, senha);
      navigation.replace("AreaLogada");
    } catch (error) {
      console.error(error.code);
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
          </View>
          <View style={estilos.botoes}>
            <Button title="Signin With Google" color="green" />
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
