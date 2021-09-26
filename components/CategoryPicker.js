import React, {Component} from 'react';
import SelectMultiple from 'react-native-select-multiple';
import { View } from 'react-native';

const userCategories = ['Donor', 'Volunteer', 'Client','Host'];

class CategoryPicker extends Component {
    state = {selectedCategories: []}
  
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

  export default CategoryPicker;