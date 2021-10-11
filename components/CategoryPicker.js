import React, {Component} from 'react';
import SelectMultiple from 'react-native-select-multiple';
import { View } from 'react-native';
import { db } from '../firebaseconfig';

// const userCategories = ['Donor', 'Volunteer', 'Client','Host'];

class CategoryPicker extends Component {
    state = {
      categories: [],
      selectedCategoryIds: []
    }
    
    componentDidMount() {
      db.collection("categories").onSnapshot(catsSnapshot => {
        const categories = [];
        catsSnapshot.forEach(doc => {
          const data = doc.data()
          categories.push({label: data.name, value: data.id})
        });
        this.setState({categories});
      });
      // const selectedCategoryIds = [];
      // catsSnapshot.forEach(doc => selectedCategoryIds.push(doc.data().category_id));
    }
  
    onSelectionsChange = (selectedCategories) => {
      this.setState({selectedCategories})
    }
  
    render () {
      const {categories, selectedCategoryIds} = this.state;
      console.log('categories', categories);
      return (
        <View>
          <SelectMultiple
            items={categories}
            selectedItems={selectedCategoryIds}
            onSelectionsChange={this.onSelectionsChange}
          />
        </View>
      )
    }
}
// need to be able to save the user's categories here
export default CategoryPicker;