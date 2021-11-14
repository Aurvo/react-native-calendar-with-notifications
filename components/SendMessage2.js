import React, { useState, useEffect } from "react";
import { View, Button, TextInput, StyleSheet } from "react-native";
import { db } from "../firebaseconfig";

const MessageContent = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={300}
    />
  );
};

const SendMessage2 = () => {
  const [messageBody, setMessageBody] = useState("");
  // const [expoPushToken, setExpoPushToken] = useState([]);
  const expoPushToken = [];
  // const expoPushToken = RegisterExpoToken();

  const categories = [];
  const user_categories = [];
  const user_pushIds = [];

  useEffect(() => {
    db.collection("categories").onSnapshot((catsSnapshot) => {
      // const categories = [];
      catsSnapshot.forEach((doc) => {
        const data = doc.data();
        categories.push({ id: data.id, name: data.name });
      });
      // console.log("from db categories: /n");
      // categories.forEach((category) => console.log(category));

      ////////////
      // const user_categories = [];
      db.collection("user_categories")
        .get()
        .then((uCatsSnapshot) => {
          uCatsSnapshot.forEach((doc) => {
            const data = doc.data();
            user_categories.push({
              category_id: data.category_id,
              uid: data.uid,
            });
          });
          // console.log("from db user_categories: /n");
          // user_categories.forEach((u) => console.log(u));

          ///////////////
          // const user_pushIds = [];
          db.collection("user_pushId")
            .get()
            .then((uPushSnapshot) => {
              uPushSnapshot.forEach((doc) => {
                const data = doc.data();
                user_pushIds.push({
                  push_token: data.pushToken,
                  uid: data.uid,
                });
              });
              console.log("Entering getTokens()...");
              getTokens(categories, user_categories, user_pushIds);
              // console.log("from db user_pushId: /n");
              // user_pushIds.forEach((p) => console.log(p));
            });
        });
    });

    const category_tokens = [];

    function getTokens(categories, user_categories, user_pushIds) {
      let category_users = [];
      let pushTokens = [];
      categories.forEach((category) => {
        // for each category, find all the users
        category_users = user_categories.filter(
          (user_category) => user_category.category_id === category.id
        );

        // for each user in the category, find the expo push token
        category_users.forEach((category_user) => {
          user_pushIds.forEach((user_pushId) => {
            if (user_pushId.uid === category_user.uid) {
              pushTokens.push(user_pushId);
            }
            // if (
            //   category_user.uid === "N3k1FQry99XHUOtVSIcgBwzOgvj1" || // iPhone 12
            //   category_user.uid === "Gvh6kS20yEQOfqCyDcF6yvOpc9J2" || // iPad
            //   category_user.uid === "DNVWkEYgOLWCsAz5uuzgESxtnMc2" // Android
            // ) {
            //   console.log("found it!");
            // }
          });
        });

        category_tokens.push({ category: category, pushTokens: pushTokens });
      });
      console.log("In getTokens()...");
      // console.log(category_tokens);

      category_tokens.forEach((category_token) => {
        let { category } = category_token;
        let { id } = category;

        console.log("category_id: " + id);

        if (id !== 100) {
          console.log("not equal 100: " + id);
          return;
        }

        let { pushTokens } = category_token;

        // console.log("pushTokens: " + pushTokens);
        pushTokens.forEach((pushToken) => {
          let { push_token } = pushToken;
          console.log("push_token: " + push_token);

          if (
            push_token === "ExponentPushToken[04VMQpAqvBUBCuGk5u_05e]" || // iPhone 12
            push_token === "ExponentPushToken[sp1cZBAXJQUF8m_ikoBUWb]" || // iPad
            push_token === "ExponentPushToken[DlGkoFEgL_4PBq9t3XNY_Q]" // Android
          ) {
            console.log("in getToken(), the expoPushToken is: " + push_token);

            updateSetExpoPushToken(push_token);
          }
        });
      });
    }

    function updateSetExpoPushToken(push_token) {
      // setExpoPushToken(expoPushToken.push(push_token));
      expoPushToken.push(push_token);
    }
  });

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
    console.log("This is in sendPushNotification: " + expoPushToken);
    const message = {
      to: expoPushToken,
      // to: "ExponentPushToken[04VMQpAqvBUBCuGk5u_05e]",
      // to: [
      //   "ExponentPushToken[DlGkoFEgL_4PBq9t3XNY_Q]",
      //   "ExponentPushToken[04VMQpAqvBUBCuGk5u_05e]",
      //   "ExponentPushToken[sp1cZBAXJQUF8m_ikoBUWb]",
      // ],
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
});

export default SendMessage2;
