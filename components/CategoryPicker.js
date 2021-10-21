import React, {useContext} from 'react';
import { View } from 'react-native';
import SelectMultiple from 'react-native-select-multiple';
import { GlobalContext } from '../contexts/GlobalContext';

const CategoryPicker = () => {
  const {categories, userSelectedCategories, onSelectionChange} = useContext(GlobalContext);
  console.log('categories', categories);
  return (
    <View>
      <SelectMultiple
        items={categories}
        selectedItems={userSelectedCategories}
        onSelectionsChange={onSelectionChange}
      />
    </View>
  );
};

export default CategoryPicker;