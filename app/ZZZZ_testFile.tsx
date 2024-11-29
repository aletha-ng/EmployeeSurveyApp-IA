import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

export default function App() {
  // Step 1: State for managing the current screen view
  const [currentScreen, setCurrentScreen] = useState('Home'); // 'Home' or 'SurveyEditor'
  const [surveyTitle, setSurveyTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');

  // Step 2: Function to handle creating a new survey
  const handleCreateSurvey = () => {
    if (surveyTitle) {
      setCurrentScreen('SurveyEditor'); // Navigate to the Survey Editor screen
    } else {
      alert('Please enter a survey title!');
    }
  };

  // Step 3: Function to handle adding questions to the survey
  const handleAddQuestion = () => {
    if (newQuestion) {
      setQuestions([...questions, newQuestion]);
      setNewQuestion(''); // Clear input field after adding question
    } else {
      alert('Please enter a question!');
    }
  };

  // Step 4: Conditional rendering based on the current screen
  if (currentScreen === 'Home') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Create a New Survey</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Survey Title"
          value={surveyTitle}
          onChangeText={setSurveyTitle}
        />
        <Button title="Create Survey" onPress={handleCreateSurvey} />
      </View>
    );
  }

  if (currentScreen === 'SurveyEditor') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Editing Survey: {surveyTitle}</Text>
        
        {/* Display existing questions */}
        <ScrollView>
          {questions.map((question, index) => (
            <Text key={index} style={styles.question}>{index + 1}. {question}</Text>
          ))}
        </ScrollView>

        {/* Add new question */}
        <TextInput
          style={styles.input}
          placeholder="Enter a new question"
          value={newQuestion}
          onChangeText={setNewQuestion}
        />
        <Button title="Add Question" onPress={handleAddQuestion} />

        <Button title="Save Survey" onPress={() => alert('Survey Saved!')} />
      </View>
    );
  }

  return null; // Fallback case
}

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
  },
  question: {
    fontSize: 18,
    marginVertical: 5,
  },
});
