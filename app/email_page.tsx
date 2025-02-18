import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const app = () => {
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sendDate, setSendDate] = useState(new Date());

  const scheduleEmail = async () => {
    //Formating the date received to MySQL format
    const dateObject = new Date(sendDate);
    const formattedDate = dateObject.toISOString().replace('T', ' ').slice(0, 19);

    const emailScheduleData = {
      subject: subject,
      body: body,
      sendDate: formattedDate,
    };

    axios
      .post('http://localhost:5001/api/schedule-email', emailScheduleData)
      .then((response) => {
        Alert.alert('Scheduled', 'Email Scheduled Successfully');

        // Clear all text input box 
        setSubject('');
        setBody('');
        setSendDate(new Date());
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to schedule email');
      });
  };

  const emailNow = async () => {
    const emailNowData = {
      subject: subject,
      body: body,
    };

    axios
      .post('http://localhost:5001/send-email-now', emailNowData)
      .then((response) => {
        Alert.alert('Sent', 'Email Sent Successfully');

        // Clear all text input box 
        setSubject('');
        setBody('');
        setSendDate(new Date());
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to send email');
      });
  };

  const ifDateChange = (event, selectedDate) => {
    setShowDatePicker(true);
    if (selectedDate) {
      setSendDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.captions}>Send Emails to Employees</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email Subject:</Text>
        <TextInput
          style={styles.input}
          value={subject}
          onChangeText={setSubject}
          placeholder="Enter email subject"
        />

        <Text style={styles.label}>Email Body:</Text>
        <TextInput
          style={styles.input}
          value={body}
          onChangeText={setBody}
          placeholder="Enter email body"
          multiline
        />
      </View>

      <View style={styles.scheduleGroup}>
        <Text style={styles.label}>Schedule Time For Sending</Text>
        <Text style={styles.label}>Select Date and Time</Text>

        <View style={styles.dateGroup}>
          {showDatePicker && (
            <DateTimePicker
              value={sendDate}
              mode="datetime"
              is24Hour={true}
              display="default"
              onChange={ifDateChange} />
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={scheduleEmail}>
        <Text style={styles.submitButtonText}>Schedule Email</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={emailNow}>
        <Text style={styles.submitButtonText}>Send Email Now</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#4682b4',
    padding: 20,
  },

  label: {
    fontSize: 16,
    marginBottom: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    width: '100%',
  },

  submitButton: {
    backgroundColor: '#8ab1b5',
    padding: 10,
    width: '100%',
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },

  captions: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 20,
  },

  inputGroup: {
    width: '100%',
    justifyContent: 'flex-start',
    marginVertical: 10,
  },

  scheduleGroup: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },

  dateGroup: {
    width: '50%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    margin: 5,
    padding: 5,
  },
});

export default app;
