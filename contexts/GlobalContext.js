import React from 'react';
import { db, auth } from '../firebaseconfig';

export const GlobalContext = React.createContext();

export const globalContextWrapper = (WrappedComponent) => {
    return class GlobalContextWrapper extends React.Component {
        state = {
            categories: [],
            userSelectedCategories: [],
            shouldRefreshEvents: true
        }

        unsubscribeSnapshotListener = null
          
        componentDidMount() {
            this.unsubscribeSnapshotListener = db.collection("categories").onSnapshot(catsSnapshot => {
                const categories = [];
                catsSnapshot.forEach(doc => {
                    const data = doc.data()
                    categories.push({label: data.name, value: data.id})
                });
                const uid = auth.currentUser.uid;
                const userSelectedCategories = [];
                db.collection("user_categories").where('uid', '==', uid).get().then(uCatsSnapshot => {
                    uCatsSnapshot.forEach(doc => {
                        const data = doc.data();
                        const matchingCategory = categories.find(c => c.value === data.category_id);
                        if (matchingCategory) userSelectedCategories.push(matchingCategory);
                    });
                    this.setState({categories, userSelectedCategories});
                });
            });
        }

        componentWillUnmount() {
            this.unsubscribeSnapshotListener();
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

        setShouldRefreshEvents = shouldRefreshEvents => this.setState({shouldRefreshEvents})

        render() {
            const {categories, userSelectedCategories, shouldRefreshEvents} = this.state;
            return (<GlobalContext.Provider value={{
                categories,
                userSelectedCategories,
                onSelectionChange: this.onSelectionChange,
                shouldRefreshEvents,
                setShouldRefreshEvents: this.setShouldRefreshEvents
            }}>
                <WrappedComponent {...this.props} />
            </GlobalContext.Provider>);
        }
    };
};