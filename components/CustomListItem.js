//This component represent each chat row in the home screen

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";

const CustomListItem = ({ id, chatName, chatContent }) => {
  console.log("hello");
  return (
    <ListItem key={id} bottomDivider>
      <Avatar
        rounded
        source={{
          uri:
            "https://cdn3.iconfinder.com/data/icons/toolbar-people/512/user_comment_man_male_talk_profile-512.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "bold" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          DUMMY SUBS
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
