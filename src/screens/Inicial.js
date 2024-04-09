import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";

export default function Inicial({ navigation }) {
  return (
    <View style={estilos.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#A8A0D0" />
      <View style={estilos.introducao}>
        <Text style={estilos.subtitulo}>Perfil com Firebase</Text>
      </View>
      <View style={estilos.botoes}>
        <Pressable
          style={[estilos.botao, estilos.botaoEntre]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={[estilos.textoBotao, estilos.textoBotaoEntre]}>
            Entre
          </Text>
        </Pressable>
        <Pressable
          style={[estilos.botao, estilos.botaoCadastre]}
          onPress={() => navigation.navigate("Cadastro")}
        >
          <Text style={[estilos.textoBotao, estilos.textoBotaoCadastre]}>
            Cadastre-se
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    justifyContent: "",
  },
  introducao: {
    width: "100%",
    padding: 8,
    marginBottom: 16,
  },
  subtitulo: {
    textAlign: "left",
    fontSize: 25,
  },
  botoes: {
    flexDirection: "row",
    marginTop: 60,
  },
  botao: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    marginHorizontal: 10,
  },
  botaoEntre: {
    backgroundColor: "#4A235A",
    borderColor: "#4A235A",
  },
  botaoCadastre: {
    backgroundColor: "#E6E6FA",
    borderColor: "#4631B4",
  },
  textoBotao: {
    fontSize: 16,
    textAlign: "center",
  },
  textoBotaoEntre: {
    color: "#E6E6FA",
  },
  textoBotaoCadastre: {
    color: "#4631B4",
  },
});
