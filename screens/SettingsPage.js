import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import CategoryPicker from "../components/CategoryPicker";
import { db, auth } from "../firebaseconfig";
import RegisterExpoToken from "../helpers/RegisterExpoToken";

const signIn = () => {
    auth.signInAnonymously()
      .then(() => {

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
};

signIn();


const writeToken = () => {
 
  const expoPushToken = RegisterExpoToken();

  db.collection("user_pushId").where('uid',"==",auth.currentUser.uid).get().then((querySnapshot) => {
    const countOfMatchingDocs = querySnapshot.size;
    

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
    
    if(countOfMatchingDocs==0) {
      db.collection("user_pushId").add({
        pushToken: expoPushToken,
        uid: auth.currentUser.uid
      })
    }
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });
  
  
};

const SettingsPage = () => {
  writeToken();
  return(
    <ScrollView>
      <Text style={styles.subheading}>Identify which group notifications you would like to receive.</Text>
      <View style={styles.subheading}>
        <CategoryPicker />
      </View>
      
    </ScrollView>
  );
}

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
  
  export default SettingsPage;