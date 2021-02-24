//Component displaying the chat

import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import { auth } from "../firebase";
const ShowChats = ({ messages }) => {
  return (
    <ScrollView contentContainerStyle={{ paddingTop: 10 }}>
      {messages.map(({ id, data }) => {
        // For sender
        return data.email === auth.currentUser.email ? (
          <View key={id} style={styles.receiver}>
            <Avatar
              position="absolute"
              rounded
              bottom={-15}
              right={-5}
              size={30}
              source={{ uri: data.photoURL }}
              //web
              containerStyle={{
                position: "absolute",
                bottom: -15,
                right: -5,
              }}
            />
            <Text style={styles.receiverText}>{data.message}</Text>
          </View>
        ) : (
          <View key={id} style={styles.sender}>
            <Avatar
              position="absolute"
              rounded
              bottom={-15}
              size={30}
              source={{ uri: data.photoURL }}
              //web
              containerStyle={{
                position: "absolute",
                bottom: -15,
                left: -3,
              }}
            />
            <Text style={styles.senderText}>{data.message}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default ShowChats;

const styles = StyleSheet.create({
  receiver: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
});
