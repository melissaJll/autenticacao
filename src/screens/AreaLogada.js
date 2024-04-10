import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  StatusBar,
} from "react-native";

import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";

export default function AreaLogada({ navigation }) {
  // Acessando dados do usuário logado
  // console.log(auth.currentUser);

  const { email } = auth.currentUser;
  console.log(email);

  const { displayName } = auth.currentUser;

  const { photoURL } = auth.currentUser;

  const logout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Inicial");
    } catch (error) {
      console.error(error.code);
    }
  };

  return (
    <View style={estilos.container}>
      <StatusBar barStyle="dark-content" />
      <Pressable onPress={() => navigation.navigate("Perfil")} title="Perfil">
        <Image
          source={{ uri: photoURL || "https://via.placeholder.com/150" }}
          style={[estilos.image, { borderRadius: 85, backgroundColor: "gray" }]}
        />
      </Pressable>

      <View style={estilos.topo}>
        <View style={estilos.infos}>
          <Text style={estilos.bemVindo}>Bem-vindo(a)</Text>
          <Text style={estilos.nomeUsuario}>{displayName} Nome completo</Text>
          <Text style={estilos.nomeUsuario}>{email} Nome completo</Text>
          <Text style={estilos.nomeUsuario}>{photoURL} Nome completo</Text>
        </View>
        <Button
          onPress={() => navigation.navigate("Perfil")}
          title="Ver Perfil"
          color="#D35400"
        />
      </View>
      <Button onPress={logout} title="Logout" color="#D35400" />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  topo: {
    padding: 10,
    marginVertical: 32,
    borderWidth: 1,
    borderColor: "#3D2498",
    borderStyle: "dashed",
    borderRadius: 5,
  },
  bemVindo: {
    fontSize: 24,
    marginVertical: 16,
    fontWeight: "500",
  },
  nomeUsuario: {
    fontSize: 16,
    fontWeight: "300",
  },
  image: {
    width: 64,
    height: 64,
    marginTop: 25,

    position: "absolute",
    right: 20,
    top: 20,

    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#3D2498",
  },
});
