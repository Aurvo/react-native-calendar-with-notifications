import React from 'react';
import { db, auth } from '../firebaseconfig';

export const GlobalContext = React.createContext();

export const globalContextWrapper = (WrappedComponent) => {
    return class GlobalContextWrapper extends React.Component {
        state = {
            categories: [],
            userSelectedCategories: []
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
                const userSelectedCategories = [];
                db.collection("user_categories").where('uid', '==', uid).get().then(uCatsSnapshot => {
                    uCatsSnapshot.forEach(doc => {
                        const data = doc.data();
                        console.log('ucat data', data);
                        userSelectedCategories.push(categories.find(c => c.value === data.category_id));
                    });
                    console.log('userSelectedCategories', userSelectedCategories);
                    this.setState({categories, userSelectedCategories});
                });
            });
        }
        
        onSelectionChange = (userSelectedCategories, selectedCategory) => {
            if (userSelectedCategories.length > this.state.userSelectedCategories.length) {
                db.collection("user_categories").add({
                    category_id: selectedCategory.value,
                    uid: auth.currentUser.uid,
                }).then(() => {
                    this.setState({userSelectedCategories});
                });
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
                        this.setState({userSelectedCategories});
                    });
            }
        }

        render() {
            const {categories, userSelectedCategories} = this.state;
            return (<GlobalContext.Provider value={{
                categories,
                userSelectedCategories,
                onSelectionChange: this.onSelectionChange
            }}>
                <WrappedComponent {...this.props} />
            </GlobalContext.Provider>);
        }
    };
};