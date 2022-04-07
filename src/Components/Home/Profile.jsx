import React, { Component } from "react";
import PropTypes from "prop-types";
import { ScrollView, View, Image, Text, Alert } from "react-native";
import {
  Avatar,
  Button,
  ButtonGroup,
  Icon,
  Input,
} from "react-native-elements";
import { axios } from "../../API/Axios";

export default class Profile extends Component {
  state = {
    selectedIndex: 0,
    firstName: "",
    firstNameErr: "",
    lastName: "",
    lastNameErr: "",
    phoneNumber: "",
    phoneNumberErr: "",
    email: "",
    emailErr: "",
    loading: false,
    change: false,
  };

  async componentDidMount() {
    await axios.get("/user").then(res => {
      this.setState({
        firstName: res.data.name,
        email: res.data.email,
        phoneNumber: res.data.contact_number,
      });
    });
  }

  handleUpdateProfile = async () => {
    this.setState({ loading: true });
    await axios
      .put("/profile", {
        name: this.state.firstName + " " + this.state.lastName,
        email: this.state.email,
        contact_number: this.state.phoneNumber,
      })
      .then(res => {
        this.setState({ loading: false });

        this.props.navigation.goBack();
      })
      .catch(err => {
        // console.log(err.response.data.errors.name);
        if (err.response.data.errors.name) {
          this.setState({ firstNameErr: err.response.data.errors.name });
        }
        if (err.response.data.errors.contact_number) {
          this.setState({
            phoneNumberErr: err.response.data.errors.contact_number,
          });
        }
        if (err.response.data.errors.email) {
          this.setState({ emailErr: err.response.data.errors.email });
        }
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignSelf: "center",
          width: "100%",
          alignItems: "center",
          paddingTop: "3%",
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            flex: 1,
            alignSelf: "center",
            width: "90%",
            alignItems: "center",
            paddingTop: "3%",
            backgroundColor: "#fff",
          }}
        >
          <Avatar
            size="xlarge"
            color="#ABB4BD"
            containerStyle={{ justifyContent: "flex-end" }}
            rounded
            source={{
              uri: "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png",
            }}
          >
            <Avatar.Accessory
              size={30}
              color="#2A2C36"
              onPress={this.getGalleryAccess}
            />
          </Avatar>

          <Button
            containerStyle={{ marginTop: "5%", width: "100%" }}
            linearGradientProps={null}
            iconContainerStyle={{ background: "#000" }}
            loadingProps={{ animating: true }}
            loadingStyle={{}}
            onPress={() => alert("badges")}
            title="Top Badges"
            titleProps={{}}
            titleStyle={{ marginHorizontal: 5 }}
          />
          <ButtonGroup
            buttonStyle={{ width: "100%" }}
            buttons={["Profile", "Social", "Links"]}
            containerStyle={{}}
            innerBorderStyle={{}}
            selectedButtonStyle={{}}
            selectedIndex={this.state.selectedIndex}
          />
          <View style={{ marginTop: "3%", width: "100%" }}>
            <Input
              containerStyle={{}}
              disabledInputStyle={{ background: "#ddd" }}
              inputContainerStyle={{}}
              errorMessage={this.state.firstNameErr}
              placeholder="First Name"
              placeholderTextColor={"grey"}
              onChangeText={val => {
                this.setState({ firstName: val, change: true });
              }}
              value={this.state.firstName}
            />
            <Input
              containerStyle={{}}
              disabledInputStyle={{ background: "#ddd" }}
              inputContainerStyle={{}}
              errorMessage={this.state.lastNameErr}
              placeholder="Last Name"
              placeholderTextColor={"grey"}
              onChangeText={val => {
                this.setState({ lastName: val, change: true });
              }}
              value={this.state.lastName}
            />
            <Input
              containerStyle={{}}
              disabledInputStyle={{ background: "#ddd" }}
              inputContainerStyle={{}}
              errorMessage={this.state.phoneNumberErr}
              placeholder="Mobile Number"
              placeholderTextColor={"grey"}
              onChangeText={val => {
                this.setState({ phoneNumber: val, change: true });
              }}
              keyboardType="number-pad"
              value={this.state.phoneNumber}
            />
            <Input
              containerStyle={{}}
              disabledInputStyle={{ background: "#ddd" }}
              inputContainerStyle={{}}
              errorMessage={this.state.emailErr}
              placeholder="Email"
              placeholderTextColor={"grey"}
              onChangeText={val => {
                this.setState({ email: val, change: true });
              }}
              value={this.state.email}
            />
            <Button
              containerStyle={{ marginTop: "5%", width: "100%" }}
              linearGradientProps={null}
              iconContainerStyle={{ background: "#000" }}
              loadingProps={{ animating: true }}
              loadingStyle={{}}
              onPress={this.handleUpdateProfile}
              title="Update"
              titleProps={{}}
              loading={this.state.loading}
              titleStyle={{ marginHorizontal: 5 }}
              disabled={!this.state.change ? true : false}
            />
          </View>
        </View>
      </View>
    );
  }
}
