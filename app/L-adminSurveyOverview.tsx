import React, {useState} from 'react';
import {Text, View, StyleSheet, Alert, Dimensions,Button,ScrollView} from 'react-native';

//Universal Constants
const { width, height } = Dimensions.get('window');


const app = () => {
    const [isPressed, setIsPressed] = useState(false);
  
    const handlePress = async () => {
      setIsPressed(true);
      Alert.alert(`Button pressed`);
    };
  
    const [isChecked, setIsChecked] = useState(false);
  
    //Layout 
    return (
      <ScrollView>
          <View style = {styles.mainContainer}>
          <View style = {styles.containerBatch}>
            <View style = {styles.containerRow}>
            <Text>Survey Number</Text>
            <Text>input later</Text>
          </View>

          <View style = {styles.containerRow}>
            <Text>responses</Text>
            <Text>innput later</Text>
          </View>

          <View style = {styles.containerRow}>
            <Text>avg time taken</Text>
            <Text>innput later</Text>
          </View>

          <View>
            <Text>Survey Department</Text>
          </View>

          <View>
            <Text>Placeholder survey list</Text>
          </View>

          </View>
        </View>
      </ScrollView>

    );
};
  
export default app;

  const styles = StyleSheet.create({
    //Container Styles
    mainContainer: {
      alignItems: 'center'
    },
  
    containerRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      margin: 10,
      borderWidth: 1,
    },
  
    containerBatch:{
      alignItems: 'center',
      width: width * 0.8,
      borderWidth: 1, 
    
    
    },
  
    //Text Styles
    heading: {
      alignItems: 'center',
    
      fontFamily: 'arial',
      fontWeight: 'bold',
      fontSize: 30,
    },
  
    heading2: {
      fontFamily: 'arial',
      fontWeight: 'bold',
      fontSize: 15,
    },
  
    heading3: {
      fontFamily: 'arial',
      fontSize: 12,
    },
  
    //Component Styles
    input: {
      height: height * 0.05,
      width: width*0.8,
      justifyContent: 'center',
      margin: 10,
      borderWidth: 1,
      padding: 5,
    },
  
    shortButton: {
      borderColor: 'black',
      borderWidth: 1,
      justifyContent: 'center',
      width: width*0.4,
      height: height*0.05,
    },
  
    longButton: {
      borderColor: 'black',
      justifyContent: 'center',
      borderWidth: 1,
      width: width * 0.6,
      height: height * 0.05,
    
    },
  
    selectedButton: {
      backgroundColor: '#c3d4d3', // Background color when selected
    },
  
    profile: {
      width: width * 0.7,
      height: height * 0.3,
      margin: 10,
    },
  
    pressableBox:{
      width: width * 0.9,
      height: height * 0.1,
      backgroundColor: 'grey',
    },
  
    surveyConsentTitle: {
      width: width * 0.9,
      height: height * 0.1,
    
    
      borderWidth: 1,
    },
  
    surveyConsentText: {
      width: width * 0.9,
    
    
      borderWidth: 1,
    },
  
    adminMenuButton:{
    
    
      borderWidth: 1,
      width: width * 0.8,
      fontSize: 15, 
    },
  
  });