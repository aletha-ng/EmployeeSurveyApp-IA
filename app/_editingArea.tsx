import React, { useState } from 'react';
import {Text,View,StyleSheet,Button,Dimensions,ScrollView, Alert} from 'react-native';
import ConsentForm from './components/consentFormEdit';
import Dropdown from './components/questionTypeMenu';

const { width, height } = Dimensions.get('window');

const App = () => {
  const [questions, setQuestions] = useState([]); //State to manage added questions

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),  // Unique ID using current timestamp
    };
    setQuestions([...questions, newQuestion]); //Add new question to the list
  };

  const deleteQuestion = (id) => {
    const newQuestions = questions.filter((question) => question.id !== id);
    setQuestions(newQuestions); // Remove question by ID
  };

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={{ alignItems: 'center' }}
    >
        <Text style={styles.header}>Survey Title </Text>
        {/* Action Buttons Row */}
        <View style={styles.row}>
            <View style={styles.smallButton}>
            <Button
                title='Save'
                onPress={() => Alert.alert("Save clicked!")}
            />
            </View>

            <View style={styles.smallButton}>
            <Button
                title='Delete'
                onPress={() => Alert.alert("Delete clicked!")}
            />
            </View>

            <View style={styles.smallButton}>
            <Button
                title='Publish'
                onPress={() => Alert.alert("Publish clicked!")}
            />
            </View>
        </View>

        {/* Consent Form */}
        <ConsentForm />

        {/* Add Question Button */}
        <View style={styles.button}>
            <Button
            title='Add Question'
            onPress={addQuestion} // Add a new question with a unique ID
            />
        </View>

        {/* Display Added Questions */}
        {questions.map((question) => (
            <View key={question.id} style={styles.questionContainer}>
            <Dropdown />
            <Text>Question ID: {question.id}</Text> 
            {/* Display the unique ID of the question */}
            <Button
                title='Delete Question'
                onPress={() => deleteQuestion(question.id)} // Delete question by ID
            />
            </View>
      ))}
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    margin: 20,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    width: width * 0.8,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
  },

  smallButton: {
    width: width * 0.25,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    margin: 5,
  },

  questionContainer: {
    marginTop: 20,
    width: width * 0.8,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },

  header: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10
  }
});
