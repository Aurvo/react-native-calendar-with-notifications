import React, { useState, useEffect, useCallback } from "react";
import { View, Button, TextInput, StyleSheet } from "react-native";
import axios from 'axios';
import { db, auth } from "../firebaseconfig";

// title for text messages
const title = "Message from Charity";

const MessageContent = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={300}
    />
  );
};

const SendMessage = ({ targetCategorIds }) => {
  const [messageBody, setMessageBody] = useState("");

  // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
  const sendPushNotification = useCallback(() => {
    axios.post('https://us-central1-cs530-smith.cloudfunctions.net/sendMessage', {
      targetCategorIds,
      messageBody,
      title
    }).catch(err => console.error('Failure Sending Message', err));
  });

  // If you type something in the text box that is a color, the background will change to that
  // color.
  return (
    <View style={styles.container}>
      <View>
        <MessageContent
          multiline
          numberOfLines={4}
          onChangeText={(messageBody) => setMessageBody(messageBody)}
          placeholder="Type content here..."
          onFocus={(e) => (e.target.placeholder = "")}
          value={messageBody}
          style={styles.input}
        />
      </View>
      <Button
        title="Send Notification"
        onPress={sendPushNotification}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  heading__lg: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 30,
    fontWeight: "bold",
  },
  subheading: {
    padding: 10,
    marginBottom: 25,
  },
  group: {
    padding: 10,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  group__item_text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 10,
  },
  input: {
    backgroundColor: "#efefefef",
    fontSize: 12,
    padding: 10,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default SendMessage;
