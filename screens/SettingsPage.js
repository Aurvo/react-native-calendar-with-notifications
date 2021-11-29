import { getExpoPushTokenAsync } from "expo-notifications";
import React, {useContext} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet
} from "react-native";
import CategoryPicker from "../components/CategoryPicker";
import { db, auth } from "../firebaseconfig";
import RegisterExpoToken from "../helpers/RegisterExpoToken";
import { GlobalContext } from '../contexts/GlobalContext';



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

const writePushToken = (props) => {
  const {userSelectedCategories} = useContext(GlobalContext);
  
  db.collection("user_pushId").where('pushToken',"==",props).get().then((querySnapshot) => { 
      db.collection("user_pushId").doc(props).set({
        pushToken: props,
        uid: auth.currentUser.uid,
        userSelectedCategories: userSelectedCategories
      })
  });
};


const SettingsPage = () => {
  writePushToken(RegisterExpoToken());
  return(
    <SafeAreaView>
      <Text style={styles.subheading}>Identify which group notifications you would like to receive.</Text>
      <View style={styles.subheading}>
        <CategoryPicker />
      </View>
    </SafeAreaView>
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