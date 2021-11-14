import React, { useState } from "react";
import { View, Button, TextInput, StyleSheet } from "react-native";
import RegisterExpoToken from "../helpers/RegisterExpoToken";
import { db, auth } from '../firebaseconfig';

const MessageContent = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={300}
    />
  );
};

const SendMessage = () => {
  const [messageBody, setMessageBody] = useState("");
  //gotta get the context for this part instead , const [targetCategories, setTargetCategories] = 
  const expoPushToken = RegisterExpoToken();

  //this should be replace with getting the id of the target categories from category toggler
  const [targetCategories] = [1,100,2];

  const [targetUids] = db.collection("user_categories").where("category_id", "array-contains", targetCategories)
  .get()
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
      });
  })
  .catch((error) => {
      console.log("Error getting documents: ", error);
  });

  //getting the push tokens from database
  const [expoPushTokens] = db.collection("user_pushId").where("uid", "array-contains", targetUids)
  .get()
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
      });
  })
  .catch((error) => {
      console.log("Error getting documents: ", error);
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
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
    </View>
  );

  // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
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
