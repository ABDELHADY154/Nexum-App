import React, { Component } from "react";
import { View } from "react-native";
import { Input, Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Icon from "react-native-vector-icons/FontAwesome";
import { axios } from "../../API/Axios";
export default class SignIn extends Component {
  state = {
    errorMessage: "",
    userName: "",
    password: "",
    loading: false,
  };
  storeToken = async token => {
    try {
      await AsyncStorage.setItem("userToken", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };
  handleSubmit = async () => {
    this.setState({ loading: true });

    await axios
      .post("/login", {
        email: this.state.userName,
        password: this.state.password,
      })
      .then(res => {
        this.storeToken(res.data.response.data.token);
        this.props.userSignIn(this.state.userName, this.state.password);
      })
      .catch(error => {
        this.setState({
          errorMessage: error.response.data.errors.password
            ? error.response.data.errors.password
            : error.response.data.errors,
        });
      });
    this.setState({ loading: false });
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ width: "90%" }}>
          <Input
            containerStyle={{}}
            disabledInputStyle={{ background: "#ddd" }}
            inputContainerStyle={{}}
            errorMessage={this.state.errorMessage}
            leftIcon={<Icon name="user" size={20} color="grey" />}
            leftIconContainerStyle={{
              marginRight: "3%",
            }}
            placeholder="Username"
            placeholderTextColor={"grey"}
            onChangeText={val => {
              this.setState({ userName: val });
            }}
          />
          <Input
            containerStyle={{}}
            disabledInputStyle={{ background: "#ddd" }}
            inputContainerStyle={{}}
            leftIcon={<Icon name="lock" size={20} color="grey" />}
            leftIconContainerStyle={{
              marginRight: "3%",
            }}
            placeholder="Password"
            placeholderTextColor={"grey"}
            passwordRules
            secureTextEntry={true}
            onChangeText={val => {
              this.setState({ password: val });
            }}
          />
          <Button
            containerStyle={{ margin: 5 }}
            linearGradientProps={null}
            iconContainerStyle={{ background: "#000" }}
            loadingProps={{ animating: true }}
            loadingStyle={{}}
            onPress={this.handleSubmit}
            title="LOGIN"
            titleProps={{}}
            loading={this.state.loading}
            titleStyle={{ marginHorizontal: 5 }}
            disabled={
              this.state.userName == "" || this.state.password == ""
                ? true
                : false
            }
          />
        </View>
      </View>
    );
  }
}
