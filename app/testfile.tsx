import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native';

const QuestionManager = () => {
    const [questions, setQuestions] = useState([]); // Stores all added questions
    const [dropdownVisible, setDropdownVisible] = useState(false); // Controls dropdown visibility
    const [selectedType, setSelectedType] = useState(null); // Tracks selected question type

    const questionTypes = ['Multiple Choice', 'Ratings', 'Written']; // Dropdown options

    // Function to add a new question of the selected type
    const addQuestion = () => {
        if (selectedType) {
            const newQuestion = {
                id: questions.length + 1,
                type: selectedType,
                options: selectedType === 'Multiple Choice' ? [] : null, // For MCQs only
                scale: selectedType === 'Ratings' ? { min: 1, max: 5 } : null, // Ratings
                text: '', // Question text
            };
            setQuestions([...questions, newQuestion]); // Add to questions array
            setSelectedType(null); // Reset dropdown selection
        }
    };

    // Function to add options for multiple-choice questions
    const addOption = (questionId) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((q) =>
                q.id === questionId
                    ? { ...q, options: [...q.options, `Option ${q.options.length + 1}`] }
                    : q
            )
        );
    };

    // Function to render individual question inputs
    const renderQuestion = ({ item }) => {
        return (
            <View style={styles.questionContainer}>
                <Text style={styles.questionLabel}>Question {item.id} ({item.type})</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter question text"
                    value={item.text}
                    onChangeText={(text) =>
                        setQuestions((prevQuestions) =>
                            prevQuestions.map((q) =>
                                q.id === item.id ? { ...q, text } : q
                            )
                        )
                    }
                />
                {item.type === 'Multiple Choice' && (
                    <View>
                        {item.options.map((option, index) => (
                            <Text key={index} style={styles.option}>
                                {option}
                            </Text>
                        ))}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => addOption(item.id)}
                        >
                            <Text style={styles.buttonText}>Add Option</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {item.type === 'Ratings' && (
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Min scale"
                            keyboardType="numeric"
                            value={item.scale?.min.toString()}
                            onChangeText={(min) =>
                                setQuestions((prevQuestions) =>
                                    prevQuestions.map((q) =>
                                        q.id === item.id ? { ...q, scale: { ...q.scale, min: Number(min) } } : q
                                    )
                                )
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Max scale"
                            keyboardType="numeric"
                            value={item.scale?.max.toString()}
                            onChangeText={(max) =>
                                setQuestions((prevQuestions) =>
                                    prevQuestions.map((q) =>
                                        q.id === item.id ? { ...q, scale: { ...q.scale, max: Number(max) } } : q
                                    )
                                )
                            }
                        />
                    </View>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Question Manager</Text>

            <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setDropdownVisible(!dropdownVisible)}
            >
                <Text style={styles.dropdownButtonText}>
                    {selectedType || 'Select Question Type'}
                </Text>
            </TouchableOpacity>

            {dropdownVisible && (
                <View style={styles.dropdown}>
                    {questionTypes.map((type, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                setSelectedType(type);
                                setDropdownVisible(false);
                            }}
                            style={styles.dropdownItem}
                        >
                            <Text style={styles.dropdownItemText}>{type}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <TouchableOpacity
                style={styles.button}
                onPress={addQuestion}
                disabled={!selectedType}
            >
                <Text style={styles.buttonText}>Add Question</Text>
            </TouchableOpacity>

            <FlatList
                data={questions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderQuestion}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    dropdownButton: {
        padding: 15,
        backgroundColor: '#ddd',
        borderRadius: 5,
        marginBottom: 10,
    },
    dropdownButtonText: {
        fontSize: 16,
    },
    dropdown: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 10,
    },
    dropdownItem: {
        padding: 15,
    },
    dropdownItemText: {
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    questionContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    questionLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    option: {
        fontSize: 16,
        marginVertical: 5,
    },
});

export default QuestionManager;
