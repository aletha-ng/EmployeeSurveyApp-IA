import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import Dropdown from './questionTypeMenu';

const QuestionManager = () => {
    const [questions, setQuestions] = useState([]); // Array to hold each question object

    // Function to add a new question
    const addQuestion = () => {
        const newQuestion = { id: Date.now().toString(), type: null }; // Unique ID and default type
        setQuestions([...questions, newQuestion]);
    };

    // Function to delete a question by id
    const deleteQuestion = (id) => {
        setQuestions(questions.filter(question => question.id !== id));
    };

    // Render each question using the Dropdown component and a delete button
    const renderQuestion = ({ item }) => (
        <View style={styles.questionContainer}>
            <Dropdown /> {/* Ensure Dropdown wraps text properly */}
            <Button title="Delete" onPress={() => deleteQuestion(item.id)} />
        </View>
    );

    return (
        <View style={styles.container}>
            <Button title="Add Question" onPress={addQuestion} />

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
    },
});
