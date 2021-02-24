//This component represent each chat row in the home screen

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { db } from "../firebase";

const CustomListItem = ({ id, chatName, showChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  //getting all the chat messages of each chat in desc acc to timestamp
  useEffect(() => {
    console.log("CUSTOME LIST");
    try {
      const unsubscribe = db
        .collection("chats")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setChatMessages(snapshot.docs.map((doc) => doc.data()))
        );

      return unsubscribe;
    } catch (error) {
      console.log("CUSTOM LIST ITEM");
      //show error page
      console.log(error);
    }
  }, []);

  return (
    <ListItem key={id} bottomDivider onPress={() => showChat(id, chatName)}>
      <Avatar
        rounded
        source={{
          uri:
            chatMessages?.[0]?.photoURL ||
            "https://cdn3.iconfinder.com/data/icons/toolbar-people/512/user_comment_man_male_talk_profile-512.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "bold" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;
