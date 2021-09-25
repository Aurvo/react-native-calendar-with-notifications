import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Calendar} from 'react-native-calendars';

const mockBackendEvents = [{
    id: 1,
    date: '2021-09-14',
    time: '11:49:59 am.',
    title: 'Super Event',
    description: 'Super duper buper frooper. YOU\'RE ALL SUPER. Bring the kids.'
}, {
    id: 2,
    date: '2021-09-20',
    time: '2:30:00 pm.',
    title: 'Tour of Tokyo',
    description: 'The most populous city in the world'
}, {
    id: 3,
    date: '2021-09-24',
    time: '12:00:00 am.',
    title: 'Your Day Off',
    description: 'The last one you\'ll ever have'
}, {
    id: 4,
    date: '2021-09-06',
    time: '4:00:00 pm.',
    title: 'Life Planning',
    description: 'You\'ll have a lot of work hosting the Super Event after the 24th.'
}, {
    id: 5,
    date: '2021-09-24',
    time: '11:59:59 pm.',
    title: 'The Beginning of the End of Your Sanity',
    description: 'See the super super super super supersuper title...'
}];

const CalendarPage = () => {
    const [dayState, setDayState] = useState({selectedDay:  null, events: []});
    const [allEventState, setAllEventState] = useState({events: [], markedDates: {}});

    const updateSselectedDay = useCallback(day => {
        setDayState({
            selectedDay: day,
            events: allEventState.events.filter(e => e.date === day.dateString)
        });
    });
    
    useEffect(() => {
        // backend call to fetch the events will go here, but for now...
        const markedDates = {};
        for (let e of mockBackendEvents) {
            markedDates[e.date] = {selected: true, selectedColor: '#0090ff'};
        }
        setAllEventState({events: mockBackendEvents, markedDates});
    }, []);
    return (<View>
        <Text>Calendar</Text>
        <Calendar
            onDayPress={updateSselectedDay}
            minDate={'1970-01-01'}
            maxDate={'2300-12-31'}
            markedDates={allEventState.markedDates}
            hideArrows={false}
        />
        {dayState.selectedDay && <View>
            <Text style={styles.header1}>Events for {dayState.selectedDay.dateString}</Text>
            {dayState.events.length > 0 ? 
            dayState.events.map(e => <View key={e.id} style={styles.eventItem}>
                <Text style={styles.header2}>{e.title}</Text>
                <Text><Text style={styles.bold}>When:</Text> {e.time}</Text>
                <Text><Text style={styles.bold}>Description:</Text> {e.description}</Text>
            </View>) :
            <Text>No events for this day</Text>}
        </View>}
    </View>)
};

const styles = StyleSheet.create({
    eventItem: {
        marginTop: 16
    },
    header1: {
        fontSize: '25px'
    },
    header2: {
        fontSize: '20px'
    },
    bold: {
        fontWeight: 'bold'
    }
});

export default CalendarPage;