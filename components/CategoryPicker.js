import React, {Component} from 'react';
import SelectMultiple from 'react-native-select-multiple';
import { View } from 'react-native';

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
// need to be able to save the user's categories here
  export default CategoryPicker;