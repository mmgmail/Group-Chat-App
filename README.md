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

- SafeAreaView
