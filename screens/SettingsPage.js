import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import CategoryPicker from "../components/CategoryPicker";
import { auth } from "../firebaseconfig";

const userCategories = ['Donor', 'Volunteer', 'Client','Host'];

  signIn = () => {
    auth.signInAnonymously()
      .then(() => {

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
}

signIn();
/*not sure where this goes but need to save user categories then need to retrieve them
https://docs.expo.dev/guides/using-firebase/ 
function storeHighScore(userId, score) {
  const db = getDatabase();
  const reference = ref(db, 'users/' + userId);
  set(ref(db, 'users/' + userId), {
    highscore: score,
  });
}
setupHighscoreListener(userId) {const db = getDatabase();
  const reference = ref(db, 'users/' + userId);
  onValue(reference, (snapshot) => {
    const highscore = snapshot.val().highscore;
    console.log("New high score: " + highscore);
  });
}
*/

const SettingsPage = () => {
  return(
    <SafeAreaView>
      <Text style={styles.subheading}>Identify which group notifications you would like to receive.</Text>
      <View style={styles.subheading}>
        <CategoryPicker selectedCategories= {[]} />
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