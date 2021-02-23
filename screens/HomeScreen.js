//Main screen. This screen contains all the chats

import { auth, db } from "../firebase";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-elements";
import CustomListItem from "../components/CustomListItem";
import { StatusBar } from "expo-status-bar";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  const signOutHandler = () => {
    auth.signOut().then(() => {
      navigation.replace("LOGIN");
    });
  };

  //retrieve all the chats from DB
  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubscribe; //For cleaning up the data, when un-rendering
  }, []);

  //Update the layout whenever we reach this screen
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity onPress={signOutHandler}>
            <Avatar
              rounded
              source={{
                uri:
                  auth?.currentUser?.photoURL ||
                  "https://cdn3.iconfinder.com/data/icons/toolbar-people/512/user_comment_man_male_talk_profile-512.png",
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: 80,
            marginRight: 5,
          }}
        >
          <TouchableOpacity style={{ marginRight: 20 }}>
            <AntDesign name="camerao" size={26} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ADD_CHAT_SCREEN")}
          >
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  return (
    <SafeAreaView>
      <StatusBar style="black" />
      <ScrollView>
        {chats.map(({ id, data: { chatName } }) => {
          return <CustomListItem id={id} chatName={chatName} key={id} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
