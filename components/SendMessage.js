import React, { useState, useEffect } from "react";
import { View, Button, TextInput, StyleSheet } from "react-native";
import RegisterExpoToken from "../helpers/RegisterExpoToken";
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

const SendMessage = ({ selectedCategories }) => {
  const [messageBody, setMessageBody] = useState("");

  function provideTrueCategoryId() {
    const trueSelectedCategories = selectedCategories.filter(
      (category) => category.isSubscribed === true
    );
    if (trueSelectedCategories.length === 0) {
      return [99999];
    }
    if (trueSelectedCategories.length > 0) {
      return trueSelectedCategories.map(
        (trueSelectedCategory) => trueSelectedCategory.category_id
      );
    }
  }
  // trueSelectedCategories.forEach((t) =>
  //   console.log("trueSelectedCategories: " + t.category_id)
  // );
  const targetCategories = provideTrueCategoryId();
  const targetUids = [];
  const targetTokens = [];
  const netTargetTokens = [];

  // console.log("result of targetCategories v2: ");
  // targetCategories.forEach((c) => console.log(c));
  // console.log("targetCategory is array: " + Array.isArray(targetCategories));

  useEffect(() => {
    const { uid } = db
      .collection("user_categories")
      .where("category_id", "in", targetCategories) // [3])
      .onSnapshot((ucatsSnapshot) => {
        ucatsSnapshot.forEach((doc) => {
          const data = doc.data();
          targetUids.push(data.uid);
          // console.log(data.uid);
        });
        const netTargetUids = [];
        // console.log("targetUids:");
        // console.log(targetUids);
        targetUids.forEach((value) => {
          var findItem = netTargetUids.indexOf(value);
          if (findItem == -1) {
            netTargetUids.push(value);
          }
        });
        // console.log(netTargetUids);
        netTargetUids.forEach((targetUid) => {
          db.collection("user_pushId")
            .where("uid", "==", targetUid)
            .onSnapshot((nTUSnapshot) => {
              // console.log(targetUid)
              nTUSnapshot.forEach((returnedDoc) => {
                const data = returnedDoc.data();
                targetTokens.push(data.pushToken);
                //netTargetTokens.push(data.pushToken)
                // console.log(data.pushToken)
                var findItem = netTargetTokens.indexOf(data.pushToken);
                if (findItem == -1) {
                  netTargetTokens.push(data.pushToken);
                  // console.log(data.pushToken);
                }
              });
            });
        });
      });
  }, [targetCategories]);

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
          await sendPushNotification(netTargetTokens);
        }}
      />
    </View>
  );

  // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
  async function sendPushNotification(netTargetTokens) {
    console.log("sending to " + netTargetTokens);
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
    padding: 10,
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 0.5,
  },
});

export default SendMessage;
