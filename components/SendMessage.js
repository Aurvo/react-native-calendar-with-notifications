import React, { useState, useEffect, useCallback } from "react";
import { View, Button, TextInput, StyleSheet } from "react-native";
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
    if (!targetCategorIds || targetCategorIds.length == 0) return;
    db.collection("user_categories").where("category_id", "in", targetCategorIds).get().then(ucatsSnapshot => {
      const targetUidsSet = new Set(); // Impossible for Sets to have duplicates
      ucatsSnapshot.forEach(doc => {
        const data = doc.data();
        targetUidsSet.add(data.uid);
      });
      const targetTokensSet = new Set();
      // getting entire collection and filtering using JavaScript, as agreed
      db.collection("user_pushId").get().then(uPushSnapshot => {
        uPushSnapshot.forEach(doc => {
          const data = doc.data();
          if (targetUidsSet.has(data.uid)) {
            targetTokensSet.add(data.pushToken);
          }
        });
        const targetTokens = Array.from(targetTokensSet);
        if (!targetTokens || targetTokens.length === 0) return;
        const message = {
          to: targetTokens,
          sound: "default",
          title,
          body: messageBody,
          data: { messageBody },
        };
        fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        }).then(response => {
          // only add to notification history if message was sent out successfully
          if (response.status === 200) {
            db.collection('notifications').add({
              title,
              message: messageBody,
              category_ids: targetCategorIds,
              date: new Date() // now
            });
          } else {
            response.json().then(error => console.error('Error in sending message:', error));
          }
        });
      });
    });
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
