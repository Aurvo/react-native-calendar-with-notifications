import React, {useState,useContext} from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import SelectMultiple from 'react-native-select-multiple';
import { GlobalContext } from '../contexts/GlobalContext';

const PushNotification = () => {
    const {categories} = useContext(GlobalContext);
    state = {selectedCategories: []};
    //const [message, setMessage] = useState('');
  
onSelectionsChange = (selectedCategories) => {
    this.setState({selectedCategories})
}
  
  console.log('categories', categories);
  return (
    <View>
        <Text style={styles.subheading}>Identify which groups should receive notifications.</Text>
        <SelectMultiple
            items={categories}
            selectedItems={this.state.selectedCategories}
            onSelectionsChange={this.onSelectionChange}
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
  });

export default PushNotification;