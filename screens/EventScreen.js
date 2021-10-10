import React, {useState, useCallback} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const AddEventScreen = () => {
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
        if (!name) {
            setErrorMessage('Name requried')
        } else if (!start) {
            setErrorMessage('Start requried')
        } else if (!end) {
            setErrorMessage('End requried')
        } else {
            console.log('name:', name);
            console.log('description:', description);
            console.log('start:', dateState.start);
            console.log('end:', dateState.end);
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
                    <Text style={styles.dateText}>{dateState.start || 'none'}</Text>
                </Pressable>
            </View>
            <View style={styles.dateField}>
                <Text style={styles.label}>End Date:</Text>
                <Pressable onPress={enableModalForEndDate}>
                    <Text style={styles.dateText}>{dateState.end || 'none'}</Text>
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
        fontSize: 20
    },
    input: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 20,
        height: 40,
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
        marginRight: 10
    },
    dateText: {
        color: 'blue'
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

export default AddEventScreen;