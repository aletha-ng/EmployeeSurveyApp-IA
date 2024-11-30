import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const SurveyEditor = ({ onSave, onCancel }) => {
  const [surveyTitle, setSurveyTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');

  // Function to handle adding questions
  const handleAddQuestion = () => {
    if (newQuestion) {
      setQuestions([...questions, newQuestion]);
      setNewQuestion('');
    } else {
      alert('Please enter a question!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Survey Title Input */}
      <Text style={styles.title}>Create/Edit Survey</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Survey Title"
        value={surveyTitle}
        onChangeText={setSurveyTitle}
      />

      {/* Existing Questions */}
      <ScrollView style={styles.questionList}>
        {questions.map((question, index) => (
          <Text key={index} style={styles.question}>
            {index + 1}. {question}
          </Text>
        ))}
      </ScrollView>

      {/* Add New Question */}
      <TextInput
        style={styles.input}
        placeholder="Enter a new question"
        value={newQuestion}
        onChangeText={setNewQuestion}
      />
      <Button title="Add Question" onPress={handleAddQuestion} />

      {/* Save and Cancel Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title="Save Survey"
          onPress={() => {
            if (!surveyTitle) {
              alert('Please provide a survey title!');
              return;
            }
            onSave({ surveyTitle, questions });
          }}
        />
        <Button title="Cancel" color="red" onPress={onCancel} />
      </View>
    </View>
  );
};

// Main App Component to demonstrate usage
export default function App() {
  const [isEditorVisible, setIsEditorVisible] = useState(false);

  // Function to handle saving the survey
  const handleSaveSurvey = (surveyData) => {
    alert(`Survey Saved!\nTitle: ${surveyData.surveyTitle}\nQuestions: ${surveyData.questions.join(', ')}`);
    setIsEditorVisible(false);
  };

  return (
    <View style={styles.container}>
      {isEditorVisible ? (
        <SurveyEditor
          onSave={handleSaveSurvey}
          onCancel={() => setIsEditorVisible(false)}
        />
      ) : (
        <View>
          <Text style={styles.title}>Welcome to the Survey App</Text>
          <Button title="Create New Survey" onPress={() => setIsEditorVisible(true)} />
        </View>
      )}
    </View>
  );
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
  questionList: {
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});
