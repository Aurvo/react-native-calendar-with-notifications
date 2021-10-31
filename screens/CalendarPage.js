import React, {useState, useEffect, useCallback, useContext} from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {Calendar} from 'react-native-calendars';
import {GlobalContext} from '../contexts/GlobalContext';

const getStartDateShortString = (longDateString) => longDateString.substr(0, 10);

const CalendarPage = () => {
    const {shouldRefreshEvents, setShouldRefreshEvents} = useContext(GlobalContext);
    const [dayState, setDayState] = useState({selectedDay:  null, events: []});
    const [allEventState, setAllEventState] = useState({events: [], markedDates: {}});

    const updateSselectedDay = useCallback(day => {
        setDayState({
            selectedDay: day,
            events: allEventState.events.filter(e => getStartDateShortString(e.start) === day.dateString)
        });
    });
    
    useEffect(() => {
        if (shouldRefreshEvents) {
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
                setShouldRefreshEvents(false)
            });
        }
    }, [shouldRefreshEvents]);
    return (<ScrollView>
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
    </ScrollView>)
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