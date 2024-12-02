///////REWRITE & CHECK AGAIN
///////REWRITE & CHECK AGAIN
///////REWRITE & CHECK AGAIN
///////REWRITE & CHECK AGAIN
///////REWRITE & CHECK AGAIN
///////REWRITE & CHECK AGAIN
///////REWRITE & CHECK AGAIN
///////REWRITE & CHECK AGAIN
///////REWRITE & CHECK AGAIN
///////REWRITE & CHECK AGAIN


import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet, FlatList, Dimensions, TextInput, Button} from 'react-native';

const { width, height } = Dimensions.get('window');
const DEFAULT_PADDING = 10;

const MultipleChoice = ({ options, addOption, editOption, deleteOption }) => (
    <View style={styles.optionContainer}>
        {options.map((option: string | undefined, index: React.Key | null | undefined) => (
            <View key={index} style={styles.optionItem}>
                <TextInput
                    style={styles.optionInput}
                    value={option}
                    onChangeText={(text) => editOption(index, text)} // Edit the option
                />
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteOption(index)} // Delete the option
                >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        ))}
        <View style = {styles.enterOptionInput}>
            <TextInput
                style={styles.optionInput} 
                placeholder="Enter an option"
                onSubmitEditing={(e) => addOption(e.nativeEvent.text)} // Add a new option
            />
        </View>
    </View>
);

const Ratings = ({ minScale, maxScale, setMinScale, setMaxScale, minCaption, maxCaption, setMinCaption, setMaxCaption }) => {
    const scaleButtons = [];
    for (let i = minScale; i <= maxScale; i++) {
        scaleButtons.push(
            <TouchableOpacity key={i} style={styles.scaleButton}>
                <Text style={styles.scaleButtonText}>{i}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.ratingContainer}>
            <Text style={styles.optionTitle}>Set Rating Scale:</Text>
            <View style={styles.scaleInputs}>
                <TextInput
                    style={styles.optionInput}
                    placeholder="Min Scale"
                    keyboardType="numeric"
                    value={String(minScale)}
                    onChangeText={(text) => setMinScale(Number(text))}
                />
                <TextInput
                    style={styles.optionInput}
                    placeholder="Max Scale"
                    keyboardType="numeric"
                    value={String(maxScale)}
                    onChangeText={(text) => setMaxScale(Number(text))}
                />
            </View>
            <View style={styles.scaleButtonsContainer}>{scaleButtons}</View>
            <View style={styles.captionContainer}>
                <TextInput
                    style={styles.optionInput}
                    placeholder="Min Scale Caption"
                    value={minCaption}
                    onChangeText={(text) => setMinCaption(text)}
                />
                <TextInput
                    style={styles.optionInput}
                    placeholder="Max Scale Caption"
                    value={maxCaption}
                    onChangeText={(text) => setMaxCaption(text)}
                />
            </View>
        </View>
    );
};


const Written = () => (
    <View style={styles.writtenContainer}>
        <Text style={styles.optionTitle}>Response:</Text>
        <TextInput
            style={styles.writtenInput}
            placeholder="Employee can write their answer here"
            multiline={true}
        />
    </View>
);



const Dropdown = () => {
    const [OptionSelected, setOptionSelected] = useState("Select a question type");
    const [visible, setVisible] = useState(false);
    const [options, setOptions] = useState([]);
    const dropdownOptions = ["Multiple Choice", "Rating", "Written"];

    const [minScale, setMinScale] = useState(1); 
    const [maxScale, setMaxScale] = useState(5); 
    const [minCaption, setMinCaption] = useState("");
    const [maxCaption, setMaxCaption] = useState("");
    

    const handleOptionPressed = (option: React.SetStateAction<string>) => {
        setOptionSelected(option);
        setVisible(false);
    };

    const addOption = (option: string) => {
        if (option.trim()) {
            setOptions([...options, option]);
            console.log('Options after adding:', options); 
            return options;
        }
    };

    const editOption = (index: number, newOption: any) => {
        const updatedOptions = options.map((option, i) => (i === index ? newOption : option));
        setOptions(updatedOptions);
        console.log('Options after editing:', options); 
    };

    const deleteOption = (index: number) => {
        const updatedOptions = options.filter((_, i) => i !== index);
        setOptions(updatedOptions);
        console.log('Options after deleting:', options); 
    };

    

    const chooseQuestionType = () => {
        switch (OptionSelected) {
            case "Multiple Choice":
                return <MultipleChoice options={options} addOption={addOption} editOption={editOption} deleteOption={deleteOption} />;
            case "Rating":
                return (
                    <Ratings
                        minScale={minScale}
                        maxScale={maxScale}
                        setMinScale={setMinScale}
                        setMaxScale={setMaxScale}
                        minCaption={minCaption}
                        maxCaption={maxCaption}
                        setMinCaption={setMinCaption}
                        setMaxCaption={setMaxCaption}
                    />
                );
            case "Written":
                return <Written/>;
            default:
                return null;
        }
    };

    return (
        <View style={styles.mainContainer}>
            <TextInput
                style={styles.questionInput}
                multiline={true}
                placeholder="Enter question here"
            />

            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.dropdown}
                    onPress={() => setVisible(true)}
                >
                    <Text style={styles.text}>
                        {OptionSelected || 'Select Question Type'}
                    </Text>

                </TouchableOpacity>

                <Modal
                    transparent={true}
                    animationType='none'
                    visible={visible}
                    onRequestClose={() => setVisible(false)}
                >
                    <TouchableOpacity
                        style={styles.modalBackground}
                        onPress={() => setVisible(false)}
                    >
                        <View style={styles.modalContent}>
                            <FlatList
                                data={dropdownOptions}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.option}
                                        onPress={() => handleOptionPressed(item)}
                                    >
                                        <Text style={styles.optionText}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>

            {chooseQuestionType()}

        </View>
    );
};

export default Dropdown;

const styles = StyleSheet.create({
    mainContainer: {
        width: width * 0.7,
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        justifyContent: 'flex-start',
    },

    container: {
        justifyContent: 'flex-start',
    },

    dropdown: {
        padding: DEFAULT_PADDING,
        borderWidth: 1,
        height: height * 0.04,
    },

    text: {
        textAlign: 'left',
    },

    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(211, 211, 211, 0.5)',
    },

    modalContent: {
        width: width * 0.9,
        padding: 20,
        margin: 20,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },

    option: {
        padding: DEFAULT_PADDING,
        width: width * 0.7,
    },

    optionText: {
        fontSize: 18,
    },

    questionInput: {
        marginBottom: 10,
        borderWidth: 1,
        padding: 5,
        flexWrap: 'wrap',
    },

    optionContainer: {
        marginTop: 15,
        borderTopWidth: 1,
        paddingTop: 10,
    },

    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    optionInput: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginRight: 10,
        flex: 1,
    },

    deleteButton: {
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5,
    },

    deleteButtonText: {
        color: 'white',
    },

    enterOptionInput: {
        height: 40
    },

    ratingContainer: {
        marginTop: 15,
        paddingTop: 10,
        borderTopWidth: 1,
    },

    scaleInputs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    scaleButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },

    scaleButton: {
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: '#eee',
        borderRadius: 5,
    },

    scaleButtonText: {
        fontSize: 16,
    },

    captionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },

    writtenContainer: {
        marginTop: 15,
        paddingTop: 10,
        borderTopWidth: 1,
    },

    writtenInput: {
        borderWidth: 1,
        padding: 10,
        height: 100,
        textAlignVertical: 'top',
        marginTop: 5,
        borderRadius: 5,
    },

    optionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    }
});
