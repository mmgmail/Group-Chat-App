//Login Screen

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Input, Button } from "react-native-elements";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //If user has logged in move to home screen
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("HOME");
      }
    });

    return unsubscribe; //We want to login once and keep the user logged in if he refreshes the page
  }, []);

  //Handle sign in functionality
  const signInHandler = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) =>
        Alert.alert("Login Error", error.message, [{ text: "Okay" }])
      );
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Image
        source={require("../assets/images/signal-logo.png")}
        style={styles.Image}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          type="password"
          secureTextEntry //HELPS IN PROVIDING DOTS FOR PASSWORD
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signInHandler}
        />
      </View>
      <Button
        title="Login"
        onPress={signInHandler}
        containerStyle={styles.buttons}
        TouchableComponent={TouchableOpacity}
      />
      <Button
        type="outline"
        title="Register"
        containerStyle={styles.buttons}
        TouchableComponent={TouchableOpacity}
        onPress={() => navigation.navigate("REGISTER")}
      />
      <View style={{ height: 120 }} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  Image: {
    width: 200,
    height: 200,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
  },
  inputContainer: { width: 300 },
  buttons: {
    width: 200,
    marginTop: 10,
  },
  registerButton: {
    backgroundColor: "white",
    color: "white",
  },
});

export default LoginScreen;
