import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Dimensions, Alert } from 'react-native';

const app = () => {
    const [agreement, setAgreement] = useState(false);
    const [satRating, setSatRating] = useState(null);
    const [response, setresponse] = useState('');
    const [responseType, setresponseType] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const getUserId = async () => {
            let retrievedID = await AsyncStorage.getItem('user_id');
            setUserId(retrievedID);
        };
        getUserId();
    }, []);

    const submitSurvey = async () => {
        if (!agreement || satRating == null || responseType == null || response.trim() === '') {
            Alert.alert("Please answer all required fields before submitting.");
            return;
        }

        const userResponse = {
            userID: userId,
            satisfactionRating: satRating,
            feedbackType: responseType,
            feedbackResponse: response,
            submittedDate: new Date().toISOString().split('T')[0],
        };

        axios
            .post('http://localhost:5001/submitSurvey', userResponse)
            .then(() => {
                Alert.alert('Survey submitted successfully');

                // Clear survey form
                setAgreement(false);
                setSatRating(null);
                setresponse('');
                setresponseType(null);
            })
            .catch((error) => {
                console.error(error);
                Alert.alert('Unable to submit survey, there was an error. Please try again.');
            });
    };

    const deleteSurvey = async () => {
        Alert.alert('Do you want to delete all responses?', 'Delete all responnses?',
            [{ text: 'cancel', style: 'cancel', },
            {
                text: 'confirm',
                onPress: () => {
                    setAgreement(false);
                    setSatRating(null);
                    setresponse('');
                    setresponseType(null);
                }
            }
            ],
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/*Consent Form */}
            <View style={styles.componentContainer}>
                <Text style={styles.title}>Consent Disclaimer</Text>
                <View style={styles.consentTextContainer}>
                    <Text style={styles.consentText}>
                        By proceeding, you agree to participate in the survey under the following terms and conditions:
                        Your responses will be used to improve our services and may be shared in anonymized reports. You
                        can withdraw your participation at any time.
                    </Text>
                </View>
                <TouchableOpacity style={[styles.btn, agreement && styles.selectedBtn]}
                    onPress={() => setAgreement(!agreement)}>
                    <Text style={styles.btnText}>I agree</Text>
                </TouchableOpacity>
            </View>

            {/*Satisfaction satRating */}
            <View style={styles.componentContainer}>
                <Text style={styles.title}>Satisfaction satRating</Text>
                <Text>On a scale of 1-5, how satisfied are you working in this company?</Text>
                <View style={styles.satisfactionChoice}>
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <TouchableOpacity key={rating}
                            style={[styles.satRatingButton, rating === satRating && styles.selectedButton]}
                            onPress={() => setSatRating(rating)}>
                            <Text>{rating}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.captionContainer}>
                    <Text style={styles.caption}>Least</Text>
                    <Text style={styles.caption}>Neutral</Text>
                    <Text style={styles.caption}>Most</Text>
                </View>
            </View>

            {/*Written Feedback */}
            <View style={styles.componentContainer}>
                <Text style={styles.title}>Feedback responses</Text>
                <View style={styles.typeSelection}>
                    <TouchableOpacity style={[styles.btn, responseType === 'feedback' && styles.selectedBtn]} onPress={() => setresponseType('feedback')}>
                        <Text style={styles.btnText}>Feedback</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.btn, responseType === 'Complaints' && styles.selectedBtn]} onPress={() => setresponseType('Complaints')}>
                        <Text style={styles.btnText}>Complaints</Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Write responses here..."
                    value={response}
                    onChangeText={setresponse}
                />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {/*Submit*/}
                <TouchableOpacity style={styles.submitButton} onPress={submitSurvey}>
                    <Text style={styles.submitDelBtnText}>Submit Survey</Text>
                </TouchableOpacity>

                {/*Delete response*/}
                <TouchableOpacity style={styles.deleteButton} onPress={deleteSurvey}>
                    <Text style={styles.submitDelBtnText}>Delete all response</Text>
                </TouchableOpacity>
            </View>
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

    btn: {
        padding: 10,
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        borderColor: 'black',
        backgroundColor: '#f9f9f9',
    },

    selectedBtn: {
        backgroundColor: '#007BFF',
        borderColor: '#007BFF',
    },

    btnText: {
        fontSize: 16,
        color: '#000',
    },

    typeSelection: {
        flexDirection: 'row',
    },

    satisfactionChoice: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 10,
    },

    satRatingButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: 50,
        height: 50,
        marginHorizontal: 5,
        borderRadius: 25,
        borderColor: 'black',
    },

    selectedButton: {
        backgroundColor: '#007BFF',
        borderColor: 'black',
    },

    captionContainer: {
        width: width * 0.65,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },

    caption: {
        fontSize: 14,
        color: 'black',
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
        marginRight: 20,
    },

    submitDelBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    deleteButton: {
        backgroundColor: '#db624f',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 20,
    },
});

export default app;
