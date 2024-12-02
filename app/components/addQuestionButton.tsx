import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TextInput } from 'react-native';
import Dropdown from './questionTypeMenu'; 

const QuestionManager = () => {
    const [questions, setQuestions] = useState([]); // Array to hold question objects

    // Function to add a new question box
    const addQuestion = () => {
        const newQuestion = { id: Date.now().toString(), type: null }; // Unique ID and default type
        setQuestions([...questions, newQuestion]); // Add the new question to the list
    };

    // Function to delete a question by id
    const deleteQuestion = (id) => {
        setQuestions(questions.filter(question => question.id !== id)); // Filter out the deleted question
    };

    // Render each question with a Dropdown and a delete button
    const renderQuestion = ({item}) => (
        <View style={styles.questionContainer}>
            <Text>Question ID: {item.id}</Text>
            {/* Dropdown to select question type */}
            <Dropdown key={item.id} />

            {/* Delete button for this question */}
            <Button title="Delete" onPress={() => deleteQuestion(item.id)} />
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Button to add a new question */}
            <Button title="Add Question" onPress={addQuestion} />

            {/* List of questions */}
            {questions.length > 0 ? (
                <FlatList
                    data={questions}
                    renderItem={renderQuestion}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.questionsList}
                />
            ) : (
                <Text>No questions added yet. Click "Add Question" to start.</Text>
            )}
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
