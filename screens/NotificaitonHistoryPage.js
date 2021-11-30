import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {GlobalContext} from '../contexts/GlobalContext';
import { db } from '../firebaseconfig';

const NotificaitonHistoryPage = () => {
    const {userSelectedCategories} = useContext(GlobalContext);
    const [notifications, setNotifications] = useState([]);

    // ensures snapshot always uses up to date subscribed category ids
    const getUserSelectedCategoryIds = useCallback(() => userSelectedCategories.map(cat => cat.value), [userSelectedCategories]);

    useEffect(() => {
        if (userSelectedCategories.length === 0) { // 'array-contains-any' throws error with empty array
            setNotifications([]);
            return;
        }
        db.collection('notifications').where('category_ids', 'array-contains-any', getUserSelectedCategoryIds())
            .orderBy('date', 'desc').onSnapshot(notificationSnapshot => {
            const notifications = [];
            notificationSnapshot.forEach(doc => {
                const data = doc.data();
                notifications.push({id: data.id, title: data.title, message: data.message, date: data.date});
            });
            setNotifications(notifications);
        });
    }, [userSelectedCategories]);
    return (<ScrollView style={styles.page}>
        <Text style={styles.header1}>Notification History</Text>
        {!!notifications.length && notifications.map(notification => <View style={styles.notification} key={`${notification.date.seconds}${notification.date.nanoseconds}`}>
            <View style={styles.notificationHeader}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.tmiestamp}>{notification.date.toDate().toLocaleString()}</Text>
            </View>
            <View>
                <Text>{notification.message}</Text>
            </View>
        </View>)}
        {!notifications.length && <View>
            <Text style={styles.noMessagesText}>You have no messages.</Text>
        </View>}
    </ScrollView>);
};

const styles = StyleSheet.create({
    page: {
        marginHorizontal: 10
    },
    header1: {
        fontSize: 25
    },
    notification: {
        marginTop: 15,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
    notificationHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between'
    },
    tmiestamp: {
        fontSize: 8,
        color: 'grey'
    },
    notificationTitle: {
        fontSize: 20,
        paddingRight: 10
    },
    noMessagesText: {
        textAlign: 'center',
        marginTop: 15,
        fontSize: 15
    }
});

export default NotificaitonHistoryPage;