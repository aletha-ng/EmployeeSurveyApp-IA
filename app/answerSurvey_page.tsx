import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Dimensions} from 'react-native';

//Consent Form Component
const ConsentForm = ({agreed, setAgreed}) => {
    const handleAgree = () => {
        setAgreed(!agreed);
    };

    return (
        <View style={styles.consentContainer}>
            <Text style={styles.title}>Consent Disclaimer</Text>
            <View style={styles.consentTextContainer}>
                <Text style={styles.consentText}>
                    By proceeding, you agree to participate in the survey under the following terms and conditions: Your responses will be used to improve our services and may be shared in anonymized reports. You can withdraw your participation at any time.
                </Text>
            </View>
            <View style={styles.checkboxContainer}>
                <TouchableOpacity
                    style={[styles.checkbox, agreed && styles.selectedCheckbox]}
                    onPress={handleAgree}
                >
                    <Text style={styles.checkboxText}>I agree</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

//Satisfaction Rating Question Component
const SatisfactionRating = ({ selectedRating, setSelectedRating }) => {
    return(
        <View style={styles.satisfactionContainer}>
            <View style={styles.satisfactionTitle}>
                <Text style={styles.title}>Satisfaction Rating</Text>
                <Text>On a scale of 1-5, how satisfied are you working in this company?</Text>
            </View>

            <View style={styles.satisfactionChoice}>
                {[1, 2, 3, 4, 5].map((rating) => (
                    <TouchableOpacity
                        key={rating}
                        style={[styles.ratingButton, selectedRating === rating && styles.selectedButton,]}
                        onPress={() => setSelectedRating(rating)}>
                        <Text style={styles.ratingText}>{rating}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.captionContainer}>
                <Text style={styles.caption}>Least </Text>
                <Text style={styles.caption}>Neutral</Text>
                <Text style={styles.caption}>Most</Text>
            </View>
        </View>
    );
};

//Written Feedback Question Component
const WrittenFeedback = ({ response, setResponse, selectedType, setSelectedType }) => {
    return (
        <View style={styles.surveyContainer}>
            <Text style={styles.title}>Feedback responses</Text>

            <View style={styles.checkboxContainer}>
                <TouchableOpacity
                    style={[
                        styles.checkbox,
                        selectedType === 'feedback' && styles.selectedCheckbox,
                    ]}
                    onPress={() => setSelectedType('feedback')}
                >
                    <Text style={styles.checkboxText}>Feedback</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.checkbox,
                        selectedType === 'Complaints' && styles.selectedCheckbox,
                    ]}
                    onPress={() => setSelectedType('Complaints')}
                >
                    <Text style={styles.checkboxText}>Complaints</Text>
                </TouchableOpacity>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Write your responses here..."
                value={response}
                onChangeText={setResponse}
            />
        </View>
    );
};

//Main Survey Screen
const SurveyScreen = () => {
    const [agreed, setAgreed] = useState(false);
    const [selectedRating, setSelectedRating] = useState(null);
    const [response, setResponse] = useState('');
    const [selectedType, setSelectedType] = useState(null);
    const [userId, setUserId] = useState(null);

    //Retrieve User ID
    useEffect(() => {
        const getUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('user_id');
                if (storedUserId) {
                    setUserId(storedUserId); 
                } else {
                    console.log("No user ID found");
                }
            } catch (error) {
                console.error('Error retrieving user_id:', error);
            }
        };
        getUserId(); 
    }, []);

    //To get current date for submitted survey date
    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');  
        const day = date.getDate().toString().padStart(2, '0'); 
        return `${year}-${month}-${day}`;  
    };

    const handleSubmit = async () => {
        if (!agreed) {
            alert("You must agree to the consent form.");
            return;
        }
        if (selectedRating === null) {
            alert("Please select a satisfaction rating.");
            return;
        }
        if (!selectedType) {
            alert("Please select a feedback type.");
            return;
        }
        if (!response.trim()) {
            alert("Please enter a response.");
            return;
        }

        const currentDate = getCurrentDate();

        //If all validations passed, pass data
        const surveyData = {
            userID: userId,
            satisfactionRating: selectedRating,
            feedbackType: selectedType,
            feedbackResponse: response,
            submittedDate: currentDate,
        };

        console.log("Survey submitted:", surveyData);

        try {
            //Send data to the backend 
            const response = await axios.post('http://localhost:5001/submitSurvey', surveyData);
            
            //Handle the response from the backend
            if (response.status === 200) {
                alert("Survey submitted successfully!");
            } else {
                alert("Error submitting survey.");
            }
        } catch (error) {
            console.error("Error submitting survey:", error);
            alert("There was an error submitting the survey. Please try again.");
        }

        
        //Reset form after submission
        setAgreed(false);
        setSelectedRating(null);
        setResponse('');
        setSelectedType(null);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.componentContainer}>
                <ConsentForm agreed={agreed} setAgreed={setAgreed} />
            </View>

            <View style={styles.componentContainer}>
                <SatisfactionRating selectedRating={selectedRating} setSelectedRating={setSelectedRating} />
            </View>

            <View style={styles.componentContainer}>
                <WrittenFeedback
                    response={response}
                    setResponse={setResponse}
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit Survey</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const width = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#4682b4',
  },

  componentContainer:{
    borderWidth: 1,
    borderRadius: 5,
    width: width * 0.9,
    margin: 10,
    alignItems: 'center'
  },

  //Consent Form Styles 
    consentContainer:{
        width: width * 0.8,
        alignItems: 'center',
        marginBottom: 30,
    },

    consentTextContainer: {
        marginVertical: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: '100%',
    },

    consentText: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
    },

    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
    },

    checkbox: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#f9f9f9',
    },

    selectedCheckbox: {
        backgroundColor: '#007BFF',
        borderColor: '#007BFF',
    },

    checkboxText: {
        fontSize: 16,
        color: '#000',
    },

    submitButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },

    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

  //Satisfaction Rating Styles
  captionContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    width: width * 0.65
  },

  caption:{
    fontSize: 14,
    color: '#000',
  },
  
  satisfactionContainer:{
    width: width * 0.8,
    alignItems: 'center'
  },

  satisfactionTitle:{
    margin: 10,
    alignItems: 'center',
  },

  satisfactionChoice:{
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  satisfactionSubmit:{
    margin: 10,
  },

  surveyContainer: {
    marginBottom: 30,
    alignItems: 'center',
    width: '100%',
  },

  ratingButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },

  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },

  checkbox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
  },

  selectedCheckbox: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },

  checkboxText: {
    fontSize: 16,
    color: '#000',
  },
  

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  selectedButton: {
    backgroundColor: '#007BFF',
  },

  ratingText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    width: '90%',
    marginBottom: 20,
    borderRadius: 5,
  },

  submitButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },

  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SurveyScreen;
