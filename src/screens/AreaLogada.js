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

      <View style={estilos.topo}>
        <View style={estilos.dadosUsuario}>
          <View style={estilos.infos}>
            <Text style={estilos.bemVindo}>Bem-vindo(a)</Text>
            <Text style={estilos.nomeUsuario}>{displayName} </Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("Perfil")}
            title="Perfil"
          >
            <Image
              source={{ uri: photoURL || "https://via.placeholder.com/150" }}
              style={[
                estilos.image,
                { borderRadius: 85, backgroundColor: "#ad91cc" },
              ]}
            />
          </Pressable>
        </View>
        <Button
          onPress={() => navigation.navigate("Perfil")}
          title="Ver Perfil"
          color="#D35400"
        />
      </View>
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
  dadosUsuario: {
    flexDirection: "row",
    backgroundColor: "red",
    gap: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
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

    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#3D2498",
  },
});
