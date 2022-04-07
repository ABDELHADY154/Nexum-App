import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { axios } from "../../API/Axios";
import { ListItem, Avatar } from "@rneui/themed";

export default class Contacts extends Component {
  state = {
    contacts: [],
  };
  async componentDidMount() {
    await axios.get("/contact").then(res => {
      this.setState({ contacts: res.data.response.data.contacts });
    });
  }

  render() {
    return (
      <View style={{ justifyContent: "flex-start", alignItems: "center" }}>
        <View style={{ width: "100%" }}>
          <ScrollView style={{ width: "100%", height: "100%" }}>
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
        </View>
      </View>
    );
  }
}
