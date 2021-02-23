//Chat screen

import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { Avatar } from "react-native-elements";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as firebase from "firebase";
import { db, auth } from "../firebase";
import ShowChats from "../components/ShowChats";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  //useLayout for updating the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <Avatar
            rounded
            //Add user's image over here
            source={{
              uri:
                messages[messages.length - 1]?.data.photoURL ||
                "https://cdn3.iconfinder.com/data/icons/toolbar-people/512/user_comment_man_male_talk_profile-512.png", //take image of last person's profile
            }}
          />
          <Text style={styles.headerText}>{route.params.chatName}</Text>
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <TouchableOpacity activeOpacity={0.5}>
            <FontAwesome name="video-camera" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Ionicons name="call" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Ionicons name="ellipsis-vertical" size={22} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messages]);

  //Sending a new message to the db in collection of this user ID
  const sendMessageHandler = () => {
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
    Keyboard.dismiss();
    setInput("");
  };

  //useLayout for updating the chat view
  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, [route]);

  const updateMessage = (text) => setInput(text);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* Below we are setting the KeyboardAvoidingView so that the keyboard doesn't overlap any other content*/}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
        keyboardVerticalOffset={110}
      >
        <>
          {/* TouchableWithoutFeedback is used to dismiss the keyboard whenever we press any chat area*/}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
            {/* Chats goes here */}
            <ShowChats messages={messages} />
          </TouchableWithoutFeedback>
          <View style={styles.footer}>
            <TextInput
              placeholder="Type your message..."
              style={styles.textInput}
              value={input}
              onChangeText={updateMessage}
              onSubmitEditing={sendMessageHandler}
            />
            <TouchableOpacity activeOpacity={0.5} onPress={sendMessageHandler}>
              <Ionicons name="send" size={22} color="#2B68E6" />
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  headerText: {
    color: "white",
    marginLeft: 15,
    fontWeight: "700",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
    marginRight: 15,
  },
  keyboardContainer: { flex: 1, marginTop: 10 },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
});
