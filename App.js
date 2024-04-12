import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

import { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Inicial from "./src/screens/Inicial";

import Cadastro from "./src/screens/Cadastro";

import Login from "./src/screens/Login";

import AreaLogada from "./src/screens/AreaLogada";

import Perfil from "./src/screens/Perfil";

import RecuperarSenha from "./src/screens/RecuperarSenha";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const Stack = createNativeStackNavigator();

export default function App() {
  // Estado para rastrear o status de login do usuário
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  // Efeito para verificar o status de login do usuário ao montar o componente
  useEffect(() => {
    const auth = getAuth(); // Obtém a instância de autenticação
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserLoggedIn(!!user); // Define isUserLoggedIn com base no estado de autenticação do usuário
    });

    return unsubscribe; // Limpa a inscrição quando o componente for desmontado
  }, []);

  return (
    <SafeAreaView style={estilos.containerSafe}>
      <StatusBar />

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isUserLoggedIn ? "AreaLogada" : "Login"}
        >
          {isUserLoggedIn ? (
            <>
              <Stack.Screen
                name="AreaLogada"
                component={AreaLogada}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Perfil"
                component={Perfil}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Inicial"
                component={Inicial}
                options={{ headerShown: false }}
              />
              {/* // Define a tela Home se o usuário estiver logado */}
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Cadastro"
                component={Cadastro}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="RecuperarSenha"
                component={RecuperarSenha}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  containerSafe: {
    flex: 1,
  },
});
