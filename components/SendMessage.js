import React, { useState, useEffect } from "react";
import { View, Button, TextInput, StyleSheet } from "react-native";
import { db, auth } from "../firebaseconfig";

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
  const [targetTokens, setTargetTokens] = useState([]);

  console.log('targetTokens', targetTokens);

  useEffect(() => {
    db.collection("user_categories")
      .where("category_id", "in", targetCategories) // [3])
      .get().then(ucatsSnapshot => {
        const targetUidsSet = new Set(); // Impossible for Sets to have duplicates
        ucatsSnapshot.forEach(doc => {
          const data = doc.data();
          targetUidsSet.add(data.uid);
        });
        const firebasePromises = [];
        const targetTokensSet = new Set();
        targetUids.forEach((targetUid) => {
          firebasePromises.push(
            db.collection("user_pushId")
              .where("uid", "==", targetUid)
              .get().then(uPushSnapshot => {
                uPushSnapshot.forEach(doc => {
                  const data = doc.data();
                  targetTokensSet.add(data.pushToken);
                });
              })
          );
        });
        Promise.all(firebasePromises).then(() => setTargetTokens(Array.from(targetTokensSet)));
      });
  }, [targetCategorIds]);

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
        onPress={async () => {
          await sendPushNotification(targetTokens);
        }}
      />
    </View>
  );

  // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
  async function sendPushNotification(netTargetTokens) {
    console.log("sending to " + netTargetTokens);
    if (!netTargetTokens || netTargetTokens.length === 0) return;
    const message = {
      to: netTargetTokens,
      sound: "default",
      title: "Message from Charity",
      body: messageBody,
      data: { messageBody },
    };
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }
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
