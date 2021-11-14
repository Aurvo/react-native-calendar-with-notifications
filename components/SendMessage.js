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
  
  //**** 
  //const expoPushToken = RegisterExpoToken();

  //this should be replace with getting the id of the target categories from category toggler
  

  
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
          for(token of tokens)
          await sendAll(netTargetTokens);
        }}
      />
    </View>
  );
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
