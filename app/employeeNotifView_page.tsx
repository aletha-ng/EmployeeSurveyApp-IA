import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Dimensions } from 'react-native';

const app = () => {
    const [consentFormAgreement, setConsentFormAgreement] = useState(false);
    const [satisfactionRating, setSatisfactionRating] = useState(null);
    const [writtenResponse, setWrittenResponse] = useState('');
    const [writtenResponseType, setWrittenResponseType] = useState(null);
    const [userId, setUserId] = useState(null);

    //get user id
    useEffect(() => {
        AsyncStorage.getItem('user_id').then((retrievedID) => {
            console.log("Retrieved User ID:", retrievedID);
            setUserId(retrievedID);
        });
    }, []);

    //get current date for survey submitted at
    const getCurrentDate = () => {
        const date = new Date();
        return date.toISOString().split('T')[0]; // Formats as YYYY-MM-DD
    };

    const submitSurvey = async () => {
        if (!consentFormAgreement || satisfactionRating === null || !writtenResponseType || !writtenResponse.trim()) {
            alert("Please complete all required fields before submitting.");
            return;
        }

        const userResponse = {
            userID: userId,
            satisfactionRating: satisfactionRating,
            feedbackType: writtenResponseType,
            feedbackResponse: writtenResponse,
            submittedDate: getCurrentDate(),
        };

        console.log("Survey submitted:", userResponse);

        try {
            const res = await axios.post('http://localhost:5001/submitSurvey', userResponse);
            if (res.status === 200) {
                alert("Survey submitted successfully");
                setConsentFormAgreement(false);
                setSatisfactionRating(null);
                setWrittenResponse('');
                setWrittenResponseType(null);
            } else {
                alert("Error submitting survey.");
            }
        } catch (error) {
            console.error("Error submitting survey:", error);
            alert("There was an error in submitting the survey. Please try again.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Consent Form */}
            <View style={styles.componentContainer}>
                <Text style={styles.title}>Consent Disclaimer</Text>
                <View style={styles.consentTextContainer}>
                    <Text style={styles.consentText}>
                        By proceeding, you agree to participate in the survey under the following terms and conditions:
                        Your writtenResponses will be used to improve our services and may be shared in anonymized reports. You
                        can withdraw your participation at any time.
                    </Text>
                </View>
                <TouchableOpacity
                    style={[styles.checkbox, consentFormAgreement && styles.selectedCheckbox]}
                    onPress={() => setConsentFormAgreement(!consentFormAgreement)}
                >
                    <Text style={styles.checkboxText}>I agree</Text>
                </TouchableOpacity>
            </View>

            {/* Satisfaction Rating */}
            <View style={styles.componentContainer}>
                <Text style={styles.title}>Satisfaction Rating</Text>
                <Text>On a scale of 1-5, how satisfied are you working in this company?</Text>
                <View style={styles.satisfactionChoice}>
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <TouchableOpacity
                            key={rating}
                            style={[styles.ratingButton, satisfactionRating === rating && styles.selectedButton]}
                            onPress={() => setSatisfactionRating(rating)}
                        >
                            <Text style={styles.ratingText}>{rating}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.captionContainer}>
                    <Text style={styles.caption}>Least</Text>
                    <Text style={styles.caption}>Neutral</Text>
                    <Text style={styles.caption}>Most</Text>
                </View>
            </View>

            {/* Written Feedback */}
            <View style={styles.componentContainer}>
                <Text style={styles.title}>Feedback writtenResponses</Text>
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                        style={[styles.checkbox, writtenResponseType === 'feedback' && styles.selectedCheckbox]}
                        onPress={() => setWrittenResponseType('feedback')}
                    >
                        <Text style={styles.checkboxText}>Feedback</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.checkbox, writtenResponseType === 'Complaints' && styles.selectedCheckbox]}
                        onPress={() => setWrittenResponseType('Complaints')}
                    >
                        <Text style={styles.checkboxText}>Complaints</Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Write your writtenResponses here..."
                    value={writtenResponse}
                    onChangeText={setWrittenResponse}
                />
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={submitSurvey}>
                <Text style={styles.submitButtonText}>Submit Survey</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#4682b4',
    },

    componentContainer: {
        borderWidth: 1,
        borderRadius: 5,
        width: width * 0.9,
        margin: 10,
        alignItems: 'center',
        padding: 15,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
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

    satisfactionChoice: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
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

    selectedButton: {
        backgroundColor: '#007BFF',
    },

    captionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        width: width * 0.65,
    },

    caption: {
        fontSize: 14,
        color: '#000',
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
        marginTop: 20,
    },

    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default app;
