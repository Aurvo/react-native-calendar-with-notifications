import React, {Component} from 'react';
import SelectMultiple from 'react-native-select-multiple';
import { View } from 'react-native';
import { auth,db } from "../firebaseconfig";
import { collection, addDoc } from "firebase/firestore";

const userCategories = ['Donor', 'Volunteer', 'Client','Host'];

class CategoryPicker extends Component {
    state = {selectedCategories: [this.props.selectedCategories]}
  
    onSelectionsChange = (selectedCategories) => {
      this.setState({selectedCategories})
    }
  
    render () {
      return (
        <View>
          <SelectMultiple
          items={userCategories}
          selectedItems={this.state.selectedCategories}
          onSelectionsChange={this.onSelectionsChange} />
        </View>
      )
    }
  }

  try {
    const docRef = db.addDoc(collection(db, "userSelectedCategories"), {
      userID: auth.currentUser.uid,
      categories: this.state.selectedCategories
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  export default CategoryPicker;