import React, { Component } from "react";
import { View } from "react-native";
import { Input, Button } from "react-native-elements";
import { axios } from "../../API/Axios";

export default class AddContact extends Component {
  state = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    loading: false,
    firstNameErr: "",
    lastNameErr: "",
    phoneNumberErr: "",
  };
  handleSubmit = async () => {
    this.setState({
      loading: true,
    });
    await axios
      .post("/contact", {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        phone_number: this.state.phoneNumber,
      })
      .then(res => {
        this.setState({
          loading: false,
        });
        this.props.navigation.push("Contacts");
      })
      .catch(err => {
        if (err.response.data.errors.first_name) {
          this.setState({
            firstNameErr: err.response.data.errors.first_name[0],
          });
        }
        if (err.response.data.errors.last_name) {
          this.setState({
            lastNameErr: err.response.data.errors.last_name[0],
          });
        }
        if (err.response.data.errors.phone_number) {
          this.setState({
            phoneNumberErr: err.response.data.errors.phone_number[0],
          });
        }
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    console.log(this.state);
    return (
      <View
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
      >
        <View style={{ width: "90%" }}>
          <Input
            containerStyle={{}}
            disabledInputStyle={{ background: "#ddd" }}
            inputContainerStyle={{}}
            errorMessage={this.state.firstNameErr}
            placeholder="First Name"
            placeholderTextColor={"grey"}
            onChangeText={val => {
              this.setState({ firstName: val });
            }}
          />
          <Input
            containerStyle={{}}
            disabledInputStyle={{ background: "#ddd" }}
            errorMessage={this.state.lastNameErr}
            inputContainerStyle={{}}
            placeholder="Last Name"
            placeholderTextColor={"grey"}
            onChangeText={val => {
              this.setState({ lastName: val });
            }}
          />
          <Input
            containerStyle={{}}
            disabledInputStyle={{ background: "#ddd" }}
            inputContainerStyle={{}}
            errorMessage={this.state.phoneNumberErr}
            placeholder="Phone Number"
            placeholderTextColor={"grey"}
            onChangeText={val => {
              this.setState({ phoneNumber: val });
            }}
            keyboardType="name-phone-pad"
          />
          <Button
            containerStyle={{ margin: 5 }}
            linearGradientProps={null}
            iconContainerStyle={{ background: "#000" }}
            loadingProps={{ animating: true }}
            loadingStyle={{}}
            onPress={this.handleSubmit}
            title="Add"
            titleProps={{}}
            loading={this.state.loading}
            titleStyle={{ marginHorizontal: 5 }}
          />
        </View>
      </View>
    );
  }
}
