import React from 'react';
import {View, Text, StyleSheet, Dimensions, TextInput, Button} from 'react-native';

const {width, height} = Dimensions.get('window');

const SurveyTitle = () => {
    return (
        <View style = {styles.mainContainer}>
            <Text style = {styles.header}>Survey Title</Text>
            <TextInput style = {styles.textInput}></TextInput>

            <View style = {styles.buttonRow}>
                <View style = {styles.button}>
                    <Button
                        title = 'Create'
                        color="black"
                    ></Button>
                </View>

                <View style = {styles.button}>
                    <Button
                        title='Cancel'
                        color="black"
                    ></Button>
                </View>
            </View>
        </View>
    );
};

export default SurveyTitle;

const styles = StyleSheet.create({
    mainContainer:{
        justifyContent: 'center',
        width: width * 0.9,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white',
    },

    header:{
        fontSize: 15, 
        fontWeight: 'bold',
        marginBottom: 20
    },

    textInput:{
        width: width * 0.85,
        padding: 5,
        borderWidth: 1,
        marginBottom: 20,
    },

    button:{
        width: width * 0.3,
        height: height * 0.05,
        justifyContent: 'center',
        borderWidth: 1,
        margin: 5,
        borderRadius: 5
    },

    buttonRow:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }
});
