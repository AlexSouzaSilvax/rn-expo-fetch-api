import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Button
} from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: true
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    this.setState({ loading: true });
    await fetch("https://alex-api-cobranca.herokuapp.com/usuarios")
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({ loading: false, data: responseJson });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let lista = this.state.data.map(u => {
      return (
        <View key={u._id} style={styles.lista}>
          <Text style={styles.textLista}>
            Email: {u.email ? u.email : "Não informado"}
          </Text>
          <Text style={styles.textLista}>
            Login: {u.login ? u.login : "Não informado"}
          </Text>
          <Text style={styles.textLista}>
            Senha: {u.senha ? u.senha : "Não informado"}
          </Text>
        </View>
      );
    });

    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <Text>Carregando...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ScrollView>{lista}</ScrollView>

          <View style={styles.btn}>
            <Button title="Update" onPress={this.getData} />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 24
  },
  lista: {
    width: Dimensions.get("screen").width - 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    margin: 5
  },
  textLista: {
    paddingStart: 10,
    fontSize: 18,
    color: "#444"
  },
  btn: {
    width: Dimensions.get("screen").width
  }
});
