import React, {useState, useCallback, useContext} from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Button, TextInput, Pressable, Alert } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {GlobalContext} from '../contexts/GlobalContext';

const AddEventSection = () => {
    const {setShouldRefreshEvents} = useContext(GlobalContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dateState, setDateState] = useState({
        start: '',
        end: '',
        dateBeingEdited: '',
        modalVisible: false
    });
    const [errorMessage, setErrorMessage] = useState('');

    const enableModalForStartDate = useCallback(() => setDateState({
        ...dateState,
        dateBeingEdited: 'start',
        modalVisible: true
    }), [dateState]);

    const enableModalForEndDate = useCallback(() => setDateState({
        ...dateState,
        dateBeingEdited: 'end',
        modalVisible: true
    }), [dateState]);

    const cancelModal = useCallback(() => setDateState({
        ...dateState,
        modalVisible: false
    }), [dateState]);

    const submitModal = useCallback(newDate => setDateState({
        ...dateState,
        [dateState.dateBeingEdited]: newDate,
        modalVisible: false
    }), [dateState]);

    const submit = useCallback(() => {
        // axios.post('https://us-central1-cs530-smith.cloudfunctions.net/addEventToCalendar', {
        //     eventName: "Firebase Event",
        //     description: "This is a sample description",
        //     startTime: "2021-10-31T10:00:00",
        //     endTime: "2021-10-31T13:00:00"
        // }).then(res => console.log('success')).catch(err => console.log(error))
        if (!name) {
            setErrorMessage('Name requried')
        } else if (!dateState.start) {
            setErrorMessage('Start Date requried')
        } else if (!dateState.end) {
            setErrorMessage('End Date requried')
        } else {
            axios.post('https://us-central1-cs530-smith.cloudfunctions.net/addEventToCalendar', {
                eventName: name,
                description: description,
                startTime: (new Date(dateState.start)).toJSON(),
                endTime: (new Date(dateState.end)).toJSON(),
            }).then(res => {
                console.log('post successful');
                Alert.alert(
                    'Success',
                    'Your event is on the cloud!',
                    [{text: 'Great!'}]
                )
                setShouldRefreshEvents(true);
            }).catch(er => console.log('error', er));
            if (errorMessage) {
                setErrorMessage('');
            }
        }
    }, [name, description, dateState, errorMessage]);
    return (<>
        <DateTimePickerModal
            isVisible={dateState.modalVisible}
            mode="datetime"
            onConfirm={submitModal}
            onCancel={cancelModal}
        />
        <View style={styles.eventForm}>
            <Text style={styles.header0}>Add Event</Text>
            <TextInput
                style={styles.input}
                value={name}
                placeholder="Name"
                onChangeText={setName}
             />
            <TextInput
                style={styles.input}
                value={description}
                placeholder="Description"
                onChangeText={setDescription}
            />
            <View style={styles.dateField}>
                <Text style={styles.label}>Start Date:</Text>
                <Pressable onPress={enableModalForStartDate}>
                    <Text style={styles.dateText}>{dateState.start && dateState.start.toString() || 'none'}</Text>
                </Pressable>
            </View>
            <View style={styles.dateField}>
                <Text style={styles.label}>End Date:</Text>
                <Pressable onPress={enableModalForEndDate}>
                    <Text style={styles.dateText}>{dateState.end && dateState.end.toString() || 'none'}</Text>
                </Pressable>
            </View>
            {errorMessage ? <View style={styles.errorBox}>
                <Text>{errorMessage}</Text>
            </View> : null}
            <Button
                onPress={submit}
                title="Submit"
            />
        </View>
    </>);
};

const styles = StyleSheet.create({
    eventForm: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    input: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 20,
        height: 40,
        fontSize: 15,
        justifyContent: 'center',
        padding: 10,
        marginTop: 10,
        marginBottom: 10
    },
    header0: {
        fontSize: 35
    },
    dateField: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 15
    },
    label: {
        fontWeight: 'bold',
        marginRight: 10,
        fontSize: 15
    },
    dateText: {
        color: 'blue',
        fontSize: 15
    },
    errorBox: {
        textAlign: 'center',
        padding: 7,
        color: 'red',
        fontWeight: 'bold',
        backgroundColor: '#ffdddd',
        borderWidth: 2,
        borderColor: "red",
        borderRadius: 25,
    }
});

export default AddEventSection;