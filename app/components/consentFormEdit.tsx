import React, { useState } from 'react';
import {View, Text, StyleSheet, Dimensions, TextInput, Pressable} from 'react-native';

const {width, height} = Dimensions.get('window');

const ConsentForm = () => {
    const [statusChecked, setStatusChecked] = useState(false);

    const pressed = () => {
        setStatusChecked((prevPressed) => !prevPressed);
    };

    return (
        <View style = {styles.mainContainer}>
            <Text style = {styles.header}>Consent Form</Text>
            <TextInput style = {styles.placeholder} multiline={true}></TextInput>

            <View style = {styles.containerRow}>
                <View style = {styles.checkButton}>
                    <Pressable 
                        onPress={pressed}
                        style={[
                            styles.checkButton,
                            {backgroundColor: statusChecked ? 'white' : '#647367' }
                        ]}
                    >
                    </Pressable>
                </View>
                <Text>I Agree</Text>
            </View>
        </View>
    );
};

export default ConsentForm;

const styles = StyleSheet.create({
    mainContainer:{
        justifyContent: 'center',
        width: width * 0.8,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white'
    },

    header:{
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5
    },

    placeholder:{
        width: width*0.7,
        borderWidth: 1,
        padding: 5,
        flexWrap: 'wrap'
    },

    containerRow:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
        alignItems: 'center'
    },

    checkButton:{
        width: width * 0.05,
        height: height * 0.025,
        borderWidth: 1,
        marginRight: 10
    }
});
