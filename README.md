# SIGNAL CLONE

## MODULES USED

- KeyboardAvoidingView:

  - avoid hiding components behind the keyboard

  ```
   <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}
  >

  <View style={{ height: 100 }} /> // Add this view to add some padding for last components
  </KeyboardAvoidingView>
  ```

- react-native-elements

  - used for Input and Button
  - ListItem, avatar

- useLayoutEffect

  - Update UI as according to navigation

- The params can be send between routes as

  ```
  const showChat = (id, chatName) => {
    navigation.navigate("CHATS", { id, chatName });
  };

  ```

  can be retrived by route.params.id. Need to get route from props
