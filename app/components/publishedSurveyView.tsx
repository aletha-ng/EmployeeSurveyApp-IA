import React from 'react';
import {Text, StyleSheet, Pressable, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

interface publishedSurveyViewVar{
    onPress?: () => void;
    title?: string;
    date?: string;
}

const PublishedSurveyView:React.FC<publishedSurveyViewVar> = ({onPress, title, date}) => {
    return (
        <Pressable onPress={onPress} style={styles.mainContainer}>
            <Text style = {styles.title}>{title}</Text>
            <Text style = {styles.date}>Published:{date}</Text>
        </Pressable>
    );
};

export default PublishedSurveyView;

const styles = StyleSheet.create({
    mainContainer:{
        justifyContent: 'flex-start',
        width: width * 0.8,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white'
    },

    title:{
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    date:{
        fontSize: 10, 
        color: 'grey',
    },
});
