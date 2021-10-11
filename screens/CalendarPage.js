import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
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

const getStartDateShortString = (longDateString) => longDateString.substr(0, 10);

const CalendarPage = () => {
    const [dayState, setDayState] = useState({selectedDay:  null, events: []});
    const [allEventState, setAllEventState] = useState({events: [], markedDates: {}});

    const updateSselectedDay = useCallback(day => {
        setDayState({
            selectedDay: day,
            events: allEventState.events.filter(e => getStartDateShortString(e.start) === day.dateString)
        });
    });
    
    useEffect(() => {
        axios.get('https://us-central1-cs530-smith.cloudfunctions.net/getEventsFromCalendar').then(res => {
            const rawEvents = res.data.items;
            const events = rawEvents.map(rev => ({
                summary: rev.summary,
                description: rev.description,
                start: rev.start.dateTime,
                end: rev.end.dateTime
            }));
            const markedDates = {};
            let keyString;
            for (let e of events) {
                keyString = getStartDateShortString(e.start);
                markedDates[keyString] = markedDates[keyString] || {selected: true, selectedColor: '#0090ff'};
            }
            setAllEventState({events, markedDates});
        });
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
                <Text style={styles.header2}>{e.summary}</Text>
                <Text><Text style={styles.bold}>Start:</Text> {new Date(e.start).toString().substr(0, 21)}</Text>
                <Text><Text style={styles.bold}>End:</Text> {new Date(e.end).toString().substr(0, 21)}</Text>
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
        fontSize: 25
    },
    header2: {
        fontSize: 20
    },
    bold: {
        fontWeight: 'bold'
    }
});

export default CalendarPage;