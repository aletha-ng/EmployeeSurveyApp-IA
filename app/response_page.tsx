///ADD STYLE SHEET

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { DataTable } from 'react-native-paper';
import axios from 'axios';

const SatisfactionBarChart = () => {
  const [ratingCounts, setRatingCounts] = useState([0, 0, 0, 0, 0]); // Placeholder
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState('');

  //Might neet to change format to smth like this (ALSO CHECK THE EMPLOYEE SIDE)
  useEffect(() => {
      //Fetch employee list from the backend API
      axios
        .get('http://localhost:5001/api/feedbacks') 
        .then((response) => {
          setFeedback(response.data);
        })
        .catch((err) => {
          setError('Failed to load feedback');
        });
    }, []);

  useEffect(() => {
    axios
      .get('http://localhost:5001/satisfaction-distribution')
      .then((response) => {
        const count = response.data.map((item) => item.count);
        setRatingCounts(count);
        console.log('check', ratingCounts)
      })
      .catch((err) => {
        setError('Failed to load satisfaction value count');
      });
  }, []);

  let sumRating = 0;
  let totalRatingResponse = 0;

  ratingCounts.forEach((count, index) => {
    const multiplier = index+1;
    totalRatingResponse += count;
    sumRating += multiplier * count;
    console.log(multiplier, totalRatingResponse, sumRating);
  });

  let averageSatisfaction = 0;
  if(totalRatingResponse === 0 ){
    averageSatisfaction = 0;
  }
  else{
    averageSatisfaction = sumRating / totalRatingResponse;
  }

  const yAxisInterval = Math.ceil(totalRatingResponse/5);
  const maxY = yAxisInterval * 5;

  const chartData = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [{data: ratingCounts}],
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
          Satisfaction Ratings
        </Text>

        <View>
          <Text>{averageSatisfaction}</Text>
        </View>


        <BarChart
          data={chartData}
          width={screenWidth - 32}
          height={400}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1} // This will ensure your custom scale works
          chartConfig={{
            backgroundColor: '#f4f4f4',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(34, 94, 180, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 8 },
            barPercentage: 0.6,
          }}
          fromZero
          showValuesOnTopOfBars
          segments={5} // Set to 5 segments on y-axis
          yMax={maxY} // Custom max Y value based on data
        />
      </View>

      <View style={{flexDirection:'row'}}>
        <View>
          <Text>Filter Responses</Text>
        </View>

        <TouchableOpacity>
          <Text>All</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text>Feedbacks Only</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text>Complains only</Text>
        </TouchableOpacity>
      </View>
  
      <View style={{padding:16}}>
        <DataTable>
            <DataTable.Header>
              <DataTable.Title>User ID</DataTable.Title>
              <DataTable.Title>Feedback Type</DataTable.Title>
              <DataTable.Title>Response</DataTable.Title>
            </DataTable.Header>
            {feedback.map((feedback, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{feedback.user_id}</DataTable.Cell>
                <DataTable.Cell>{feedback.written_type}</DataTable.Cell>
                <DataTable.Cell>{feedback.written_response}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
      </View>
    </ScrollView>
  );
};

export default SatisfactionBarChart;

/////////////////////

// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, StyleSheet } from 'react-native';
// import { LineChart } from 'react-native-chart-kit';
// import { DataTable } from 'react-native-paper';
// import axios from 'axios';

// const surveyResponse = () => {
//   const [satisfactionData, setSatisfactionData] = useState([]);
//   const [feedbackData, setFeedbackData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         //Get satisfaction rating
//         const satisfactionResponse = await axios.get('http://localhost:5001/satisfaction-ratings');
        
//         setSatisfactionData(satisfactionResponse.data);

//         //Get feedback data
//         const feedbackResponse = await axios.get('http://localhost:5001/feedbacks');
//         setFeedbackData(feedbackResponse.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();
//   }, []);

//   const satisfactionLabels = satisfactionData.map((item) => item.date);
//   const satisfactionValues = satisfactionData.map((item) => item.rating);

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Satisfaction Rating</Text>
//       <LineChart
//         data={{
//           labels: satisfactionLabels,
//           datasets: [
//             {
//               data: satisfactionValues,
//             },
//           ],
//         }}
//         width={320}
//         height={220}
//         yAxisLabel="Rating"
//         chartConfig={{
//           backgroundColor: '#e26a00',
//           backgroundGradientFrom: '#fb8c00',
//           backgroundGradientTo: '#ff9800',
//           decimalPlaces: 1,
//           color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//           labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//         }}
//         style={styles.graph}
//       />

//       <Text style={styles.title}>Feedback Table</Text>
//       <DataTable>
//         <DataTable.Header>
//           <DataTable.Title>User ID</DataTable.Title>
//           <DataTable.Title>Feedback Type</DataTable.Title>
//           <DataTable.Title>Response</DataTable.Title>
//         </DataTable.Header>
//         {feedbackData.map((item, index) => (
//           <DataTable.Row key={index}>
//             <DataTable.Cell>{item.userId}</DataTable.Cell>
//             <DataTable.Cell>{item.type}</DataTable.Cell>
//             <DataTable.Cell>{item.response}</DataTable.Cell>
//           </DataTable.Row>
//         ))}
//       </DataTable>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#4682b4',
//   },
  
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginVertical: 10,
//   },
//   graph: {
//     marginVertical: 20,
//     borderRadius: 10,
//   },
// });

// export default surveyResponse;
