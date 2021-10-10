import React from 'react';
import { View, Text, StyleSheet } from "react-native";

const FormField = ({label, children}) => {
    return (<View style={styles.formField}>
        <View><Text style={styles.label}>{label}:</Text></View>
        <View>{children}</View>
    </View>);
};

const styles = StyleSheet.create({
    formField: {
        marginTop: 8,
        marginBottom: 8
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10
    }
});

export default FormField;