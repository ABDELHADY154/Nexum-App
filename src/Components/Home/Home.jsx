import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { Header } from "react-native-elements";
import { Text, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Fontisto";
import IconAnt from "react-native-vector-icons/AntDesign";
import IconMat from "react-native-vector-icons/MaterialCommunityIcons";
import { Input } from "galio-framework";
import { ListItem, Avatar } from "@rneui/themed";
import { axios } from "../../API/Axios";
import Drawer from "react-native-drawer";

export default class Home extends Component {
  state = {
    loading: false,
    contacts: [],
    term: "",
  };
  async componentDidMount() {
    await axios.get("/contact").then(res => {
      this.setState({ contacts: res.data.response.data.contacts });
    });
  }
  searchHandleSubmit = async () => {
    this.setState({ loading: true });
    if (this.state.term !== "") {
      await axios.get(`/search?term=${this.state.term}`).then(res => {
        this.setState({
          loading: false,
          contacts: res.data.response.data.contacts,
        });
      });
    }
    this.setState({
      loading: false,
    });
  };
  onRefreshHandler = async () => {
    await axios.get("/contact").then(res => {
      this.setState({ contacts: res.data.response.data.contacts, term: "" });
    });
  };
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
                onPress={() => this.props.navigation.push("AddNewContact")}
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
                onPress={() => this.props.navigation.push("Contacts")}
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

        <Input
          style={{ width: "90%", alignSelf: "center" }}
          placeholder="Search"
          onChangeText={e => this.setState({ term: e })}
          type="default"
        />
        <Button
          containerStyle={{ margin: 5, width: "90%", alignSelf: "center" }}
          loadingProps={{ animating: true }}
          title="Search"
          loading={this.state.loading}
          onPress={this.searchHandleSubmit}
          titleStyle={{ marginHorizontal: 5 }}
        />
        <View style={{ width: "100%", height: "42%" }}>
          <ScrollView style={{ width: "100%", height: "35%" }}>
            {this.state.contacts.map(contact => {
              return (
                <ListItem
                  friction={90}
                  tension={100}
                  activeScale={0.95}
                  key={contact.id}
                  topDivider={true}
                  bottomDivider={true}
                >
                  <Avatar
                    rounded
                    source={{
                      uri: "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png",
                    }}
                  />
                  <ListItem.Content>
                    <ListItem.Title style={{ fontWeight: "bold" }}>
                      {contact.first_name} {contact.last_name}
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              );
            })}
          </ScrollView>

          <View
            style={{
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              backgroundColor: "#2089DC",
              height: "30%",
            }}
          >
            <Button
              buttonStyle={{
                width: 50,
                height: 50,
                borderRadius: 1000,
                backgroundColor: "#fff",
                marginLeft: "25%",
              }}
              containerStyle={{ margin: 5, borderRadius: 1000 }}
              icon={<IconAnt name="user" size={25} color="#2089DC" />}
              iconContainerStyle={{ background: "#2089DC" }}
              loadingProps={{ animating: true }}
              loadingStyle={{}}
              onPress={this.onRefreshHandler}
              titleProps={{}}
            />
            <Text
              style={{
                color: "#fff",
                alignSelf: "flex-start",
                marginLeft: "4%",
              }}
            >
              Refresh Contacts
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
