// Screen to add new chat

import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from "../firebase";

const AddChatScreen = ({ navigation }) => {
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    setInputText("");
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
    });
  }, [navigation]);

  //This function takes the new chat name and adds it to firebase database. If everything is successful, then go back to previous screen
  const addChatHandler = async () => {
    //If no input is given, throw an error
    if (inputText.length == 0) {
      Alert.alert(
        "Name of chat required",
        "No name set for chat",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      return;
    }
    await db
      .collection("chats")
      .add({ chatName: inputText })
      .then(() => navigation.goBack())
      .catch((error) => console.log(error));
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={inputText}
        onChangeText={(text) => setInputText(text)}
        onSubmitEditing={addChatHandler}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />
      <Button
        onPress={addChatHandler}
        title="Create new Chat"
        TouchableComponent={TouchableOpacity}
      />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
});
