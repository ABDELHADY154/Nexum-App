import React, { Component } from "react";
import { View } from "react-native";
import { Header } from "react-native-elements";
import { Text, Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/Fontisto";
import IconAnt from "react-native-vector-icons/AntDesign";
import IconMat from "react-native-vector-icons/MaterialCommunityIcons";

export default class Home extends Component {
  state = {};

  render() {
    return (
      <View style={{ width: "100%" }}>
        <Header
          backgroundImageStyle={{}}
          barStyle="default"
          centerComponent={{
            style: { color: "#fff" },
          }}
          centerContainerStyle={{}}
          containerStyle={{ width: "100%" }}
          rightComponent={{
            icon: "menu",
            color: "#fff",
            onPress: () => {
              console.log("pressed");
            },
          }}
          placement="center"
          statusBarProps={{ barStyle: "light-content" }}
        />
        <View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              h1
              h1Style={{
                textAlign: "center",
                marginVertical: "10%",
                color: "#2089DC",
              }}
            >
              Add Contacts
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View>
              <Button
                buttonStyle={{ width: 100, height: 100, borderRadius: 1000 }}
                containerStyle={{ margin: 5, borderRadius: 1000 }}
                icon={
                  <IconMat
                    name="plus-box-multiple-outline"
                    size={50}
                    color="#fff"
                    style={{ transform: [{ rotate: "180deg" }] }}
                  />
                }
                iconContainerStyle={{ background: "#000" }}
                loadingProps={{ animating: true }}
                loadingStyle={{}}
                onPress={() => alert("click")}
                titleProps={{}}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: "gray",
                }}
              >
                New
              </Text>
            </View>
            <View>
              <Button
                buttonStyle={{ width: 100, height: 100, borderRadius: 1000 }}
                containerStyle={{ margin: 5, borderRadius: 1000 }}
                icon={<IconAnt name="contacts" size={50} color="#fff" />}
                iconContainerStyle={{ background: "#000" }}
                loadingProps={{ animating: true }}
                loadingStyle={{}}
                onPress={() => alert("click")}
                titleProps={{}}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: "gray",
                }}
              >
                Phone Book
              </Text>
            </View>
            <View>
              <Button
                buttonStyle={{ width: 100, height: 100, borderRadius: 1000 }}
                containerStyle={{ margin: 5, borderRadius: 1000 }}
                icon={<Icon name="email" size={50} color="#fff" />}
                iconContainerStyle={{ background: "#000" }}
                loadingProps={{ animating: true }}
                loadingStyle={{}}
                onPress={() => alert("click")}
                titleProps={{}}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: "gray",
                }}
              >
                Email
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: "gray",
            borderBottomWidth: 0.5,
            width: "90%",
            alignSelf: "center",
            marginVertical: "5%",
          }}
        />
        <View></View>
      </View>
    );
  }
}
