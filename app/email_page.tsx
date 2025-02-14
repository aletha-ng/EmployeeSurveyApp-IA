import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function SimpleDatePicker() {
  const [day, setDay] = useState('1');
  const [month, setMonth] = useState('1');
  const [year, setYear] = useState('2025');

  const [selectedSection, setSelectedSection] = useState(null);

  const openPicker = (section) => {
    setSelectedSection(section);
  };

  const closePicker = () => {
    setSelectedSection(null);
  };

  return (
    <View style={styles.container}>
      <Text>Select Date:</Text>

      <View style={styles.selectionRow}>
        {/* Day Picker Trigger */}
        <TouchableOpacity style={styles.selectionBox} onPress={() => openPicker('day')}>
          <Text>{day}</Text>
        </TouchableOpacity>

        {/* Month Picker Trigger */}
        <TouchableOpacity style={styles.selectionBox} onPress={() => openPicker('month')}>
          <Text>{month}</Text>
        </TouchableOpacity>

        {/* Year Picker Trigger */}
        <TouchableOpacity style={styles.selectionBox} onPress={() => openPicker('year')}>
          <Text>{year}</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Picker */}
      <Modal visible={!!selectedSection} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedSection === 'day' ? day : selectedSection === 'month' ? month : year}
              onValueChange={(itemValue) => {
                if (selectedSection === 'day') setDay(itemValue);
                else if (selectedSection === 'month') setMonth(itemValue);
                else if (selectedSection === 'year') setYear(itemValue);
              }}
            >
              {selectedSection === 'day' &&
                Array.from({ length: 31 }, (_, i) => (
                  <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />
                ))}

              {selectedSection === 'month' &&
                Array.from({ length: 12 }, (_, i) => (
                  <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />
                ))}

              {selectedSection === 'year' &&
                ['2024', '2025', '2026'].map((yr) => <Picker.Item key={yr} label={yr} value={yr} />)}
            </Picker>

            <TouchableOpacity onPress={closePicker} style={styles.closeButton}>
              <Text>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  selectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectionBox: {
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
});


// import axios from 'axios';
// import React, { useState } from 'react';
// import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';

// const EmailScheduler = () => {
//   const [date, setDate] = useState(null);
//   const [month, setMonth] = useState(null);
//   const [year, setYear] = useState(null);
//   const [content, setContent] = useState('');

//   const handleSend = async () => {
//     if (!date || !month || !year || !content) {
//       Alert.alert('Error', 'Please fill all fields');
//       return;
//     }

//     const scheduledDate = `${date}-${month}-${year}`;

//     try {
//         //Send the data to the backend using Axios
//         const response = await axios.post('http://localhost:5001/sendEmail', {
//           date: scheduledDate,
//           content,
//           recipientId: recipients, 
//         });
    
//         Alert.alert('Success', `Email scheduled for ${scheduledDate}`);
//       } catch (error) {
//         console.error('Error sending email:', error);
//         Alert.alert('Error', 'There was an error scheduling the email.');
//       }
    
//   };

  

//   const handleCancel = () => {
//     setDate(null);
//     setMonth(null);
//     setYear(null);
//     setContent('');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Send email at:</Text>
//       <View style={styles.pickerRow}>
//         {/* Date Picker */}
//         <View style={styles.pickerWrapper}>
//           <DropDownPicker
//             items={Array.from({ length: 31 }, (_, i) => ({
//               label: `${i + 1}`,
//               value: `${i + 1}`,
//             }))}
//             defaultValue={date}
//             onChangeItem={(item) => setDate(item.value)}
//             placeholder="Select Date"
//             style={styles.picker}
//             dropDownStyle={styles.dropdown}
//           />
//         </View>

//         {/* Month Picker */}
//         <View style={styles.pickerWrapper}>
//           <DropDownPicker
//             items={[
//               { label:'January', value:'January' },
//               { label:'February', value:'February' },
//               { label:'March', value:'March' },
//               { label:'April', value:'April' },
//               { label:'May', value:'May' },
//               { label:'June', value:'June' },
//               { label:'July', value:'July' },
//               { label:'August', value:'August' },
//               { label:'September', value:'September' },
//               { label:'October', value:'October' },
//               { label:'November', value:'November' },
//               { label:'December', value:'December' },
//             ]}
            
//             defaultValue={month}
//             onChangeItem={(item) => setMonth(item.value)}
//             placeholder="Select Month"
//             style={styles.picker}
//             dropDownStyle={styles.dropdown}
//           />
//         </View>

//         {/* Year Picker */}
//         <View style={styles.pickerWrapper}>
//           <DropDownPicker
//             items={Array.from({ length: 5 }, (_, i) => ({
//               label: `${2025 + i}`,
//               value: `${2025 + i}`,
//             }))}
//             defaultValue={year}
//             onChangeItem={(item) => setYear(item.value)}
//             placeholder="Select Year"
//             style={styles.picker}
//             dropDownStyle={styles.dropdown}
//           />
//         </View>
//       </View>

//       <Text style={styles.label}>Content to send:</Text>
//       <TextInput
//         style={styles.textInput}
//         placeholder="Enter content"
//         value={content}
//         onChangeText={setContent}
//         multiline
//       />

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
//           <Text style={styles.buttonText}>Cancel</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
//           <Text style={styles.buttonText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#4682b4',
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   pickerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   pickerWrapper: {
//     flex: 1,
//     marginHorizontal: 5,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     overflow: 'hidden',
//   },

//   picker: {
//     height: 50,
//   },

//   dropdown: {
//     backgroundColor: '#fafafa',
//   },

//   textInput: {
//     height: 100,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 20,
//     textAlignVertical: 'top',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },

//   cancelButton: {
//     flex: 1,
//     backgroundColor: '#f44336',
//     padding: 15,
//     borderRadius: 5,
//     marginRight: 10,
//     alignItems: 'center',
//   },

//   sendButton: {
//     flex: 1,
//     backgroundColor: '#4CAF50',
//     padding: 15,
//     borderRadius: 5,
//     marginLeft: 10,
//     alignItems: 'center',
//   },

//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default EmailScheduler;
