import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TextInput } from 'react-native';
import Dropdown from './questionTypeMenu'; // Assuming this is correctly implemented

const QuestionManager = () => {
    const addQuestion = () => {
        <Dropdown></Dropdown>
    };

    return (
        <View style={styles.container}>
            <Button title="Add Question" onPress={addQuestion} />
        </View>
    );
};

export default QuestionManager;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        width: '100%',
    },
    questionsList: {
        marginTop: 20,
        width: '100%',
    },
    questionContainer: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#f9f9f9',
        width: '100%',
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        marginBottom: 10,
    },
});
