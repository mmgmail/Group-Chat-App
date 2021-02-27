//This screen shows the registration form

import React, { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Text, Input, Button } from "react-native-elements";
import { auth } from "../firebase";
const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  //Register user to firebase
  //Adding user's name and profile photo
  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imageUrl ||
            "https://cdn3.iconfinder.com/data/icons/toolbar-people/512/user_comment_man_male_talk_profile-512.png",
        });
        //When user is logged in, we don't want him to go back to login/registration page.
        //So we pop all the pages from the stack and only home page is pushed
        navigation.reset({
          index: 0,
          routes: [{ name: "HOME" }],
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text h3 style={{ marginBottom: 30 }}>
        Create your Account
      </Text>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
        />
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
        />
        <Input
          placeholder="Profile Picture URL (optional)"
          type="text"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button
        title="Register"
        onPress={register}
        containerStyle={styles.button}
        raised
        TouchableComponent={TouchableOpacity}
      />
      <View style={{ height: 80 }}></View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  button: {
    width: 200,
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: { width: 300 },
});
