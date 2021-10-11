import React, {Component} from 'react';
import SelectMultiple from 'react-native-select-multiple';
import { View } from 'react-native';
import { db, auth } from '../firebaseconfig';

// const userCategories = ['Donor', 'Volunteer', 'Client','Host'];

class CategoryPicker extends Component {
    state = {
      categories: [],
      selectedCategories: []
    }
    
    componentDidMount() {
      db.collection("categories").onSnapshot(catsSnapshot => {
        const categories = [];
        catsSnapshot.forEach(doc => {
          const data = doc.data()
          categories.push({label: data.name, value: data.id})
        });
        const uid = auth.currentUser.uid;
        console.log('uid', uid);
        const selectedCategories = [];
        db.collection("user_categories").where('uid', '==', uid).get().then(uCatsSnapshot => {
          uCatsSnapshot.forEach(doc => {
            const data = doc.data();
            console.log('ucat data', data);
            selectedCategories.push(categories.find(c => c.value === data.category_id));
          });
          console.log('selectedCategories', selectedCategories);
          this.setState({categories, selectedCategories});
        });
      });
    }
  
    onSelectionsChange = (selectedCategories, selectedCategory) => {
      if (selectedCategories.length > this.state.selectedCategories.length) {
        db.collection("user_categories").add({
          category_id: selectedCategory.value,
          uid: auth.currentUser.uid,
        }).then(() => {
          this.setState({selectedCategories});
      })
      } else {
        db.collection("user_categories")
          .where('uid', '==', auth.currentUser.uid)
          .where('category_id', '==', selectedCategory.value)
          .get().then(uCatSnap => {
            // Once we get the results, begin a batch
            const batch = db.batch();
            uCatSnap.forEach(function(doc) {
                // For each doc, add a delete operation to the batch
                batch.delete(doc.ref);
            });
            // Commit the batch
            batch.commit();
            this.setState({selectedCategories});
          });
      }
    }
  
    render () {
      const {categories, selectedCategories} = this.state;
      console.log('categories', categories);
      return (
        <View>
          <SelectMultiple
            items={categories}
            selectedItems={selectedCategories}
            onSelectionsChange={this.onSelectionsChange}
          />
        </View>
      )
    }
}
// need to be able to save the user's categories here
export default CategoryPicker;