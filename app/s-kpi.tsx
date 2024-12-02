import React, { useState } from 'react';
import { ScrollView, View, Text, Button, TextInput, StyleSheet, Dimensions } from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';

const CombinedKPIsScreen = () => {
  // Test Data for Turnover Rate and Satisfaction Rate for 2024 only
  const [turnoverData, setTurnoverData] = useState([
    { year: 2024, left: 400, stayed: 600 }, // Only 2024
  ]);

  const [satisfactionData, setSatisfactionData] = useState([
    { year: 2024, ratings: { 1: 10, 2: 20, 3: 40, 4: 100, 5: 150 } }, // Only 2024
  ]);

  const [retentionData, setRetentionData] = useState([
    { year: 2024, start: 1000, left: 400, end: 600 }, // Example data for 2024
  ]);

  const [isEditMode, setIsEditMode] = useState(false);

  // Update turnover data
  const updateTurnoverData = (updatedRow) => {
    setTurnoverData([updatedRow]); // Only 2024 data is being updated
  };

  // Update satisfaction data
  const updateSatisfactionData = (updatedRow) => {
    setSatisfactionData([updatedRow]); // Only 2024 data is being updated
  };

  // Update retention data
  const updateRetentionData = (updatedRow) => {
    setRetentionData([updatedRow]); // Only 2024 data is being updated
  };

  // Pie chart data for Turnover Rate (2024 only)
  const turnoverChartData = [
    {
      name: `Employees Left 2024`,
      population: turnoverData[0].left,
      color: '#ff6347',
      legendFontColor: '#000',
      legendFontSize: 15,
    },
    {
      name: `Employees Stayed 2024`,
      population: turnoverData[0].stayed,
      color: '#4682b4',
      legendFontColor: '#000',
      legendFontSize: 15,
    },
  ];

  // Bar chart data for Satisfaction Rate (2024 only)
  const satisfactionChartData = {
    labels: ['2024'], // Only 2024
    datasets: [
      {
        data: [
          Object.values(satisfactionData[0].ratings).reduce((acc, val) => acc + val, 0),
        ],
        color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // Orange color
        strokeWidth: 2,
      },
    ],
  };

  // Bar chart data for Employee Retention Rate (2024 only)
  const retentionChartData = {
    labels: ['Employees at Start', 'Employees at End'],
    datasets: [
      {
        data: [retentionData[0].start, retentionData[0].end],
        color: (opacity = 1) => `rgba(50, 205, 50, ${opacity})`, // Green color
        strokeWidth: 2,
      },
    ],
  };

  // Calculate Employee Retention Rate (Formula: (End / Start) * 100)
  const retentionRate = (
    (retentionData[0].end / retentionData[0].start) *
    100
  ).toFixed(2);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
      <Text style={styles.title}>Combined KPIs - 2024</Text>

      {/* Employee Satisfaction Rate Section */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Employee Satisfaction Rate (2024)</Text>

        {/* Satisfaction Rate Chart */}
        <BarChart
          data={satisfactionChartData}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#2D3E50',
            backgroundGradientFrom: '#2D3E50',
            backgroundGradientTo: '#34495E',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // Orange color
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForLabels: {
              fontSize: 14,
            },
          }}
          verticalLabelRotation={30}
        />

        {/* Satisfaction Rate Data */}
        {satisfactionData.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>Year: {item.year}</Text>
            {isEditMode ? (
              Object.keys(item.ratings).map((rating) => (
                <View key={rating} style={styles.ratingRow}>
                  <Text style={styles.ratingLabel}>Rating {rating}:</Text>
                  <TextInput
                    style={styles.cellInput}
                    defaultValue={String(item.ratings[rating])}
                    keyboardType="numeric"
                    onEndEditing={(e) => {
                      const updatedRatings = { ...item.ratings, [rating]: parseInt(e.nativeEvent.text) };
                      updateSatisfactionData({ ...item, ratings: updatedRatings });
                    }}
                  />
                </View>
              ))
            ) : (
              Object.keys(item.ratings).map((rating) => (
                <View key={rating} style={styles.ratingRow}>
                  <Text style={styles.cell}>Rating {rating}: {item.ratings[rating]}</Text>
                </View>
              ))
            )}
          </View>
        ))}
      </View>

      {/* Employee Turnover Rate Section */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Employee Turnover Rate (2024)</Text>

        {/* Turnover Rate Chart */}
        <PieChart
          data={turnoverChartData}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#2D3E50',
            backgroundGradientFrom: '#2D3E50',
            backgroundGradientTo: '#34495E',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />

        {/* Turnover Rate Data */}
        {turnoverData.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>Year: {item.year}</Text>
            {isEditMode ? (
              <>
                <TextInput
                  style={styles.cellInput}
                  defaultValue={String(item.left)}
                  onEndEditing={(e) => {
                    const updatedRow = { ...item, left: parseInt(e.nativeEvent.text) };
                    updateTurnoverData(updatedRow);
                  }}
                />
                <TextInput
                  style={styles.cellInput}
                  defaultValue={String(item.stayed)}
                  onEndEditing={(e) => {
                    const updatedRow = { ...item, stayed: parseInt(e.nativeEvent.text) };
                    updateTurnoverData(updatedRow);
                  }}
                />
              </>
            ) : (
              <>
                <Text style={styles.cell}>Employees Left: {item.left}</Text>
                <Text style={styles.cell}>Employees Stayed: {item.stayed}</Text>
              </>
            )}
          </View>
        ))}
      </View>

      {/* Employee Retention Rate Section */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Employee Retention Rate (2024)</Text>

        {/* Retention Rate Chart */}
        <BarChart
          data={retentionChartData}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#2D3E50',
            backgroundGradientFrom: '#2D3E50',
            backgroundGradientTo: '#34495E',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(50, 205, 50, ${opacity})`, // Green color
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          verticalLabelRotation={30}
        />

        {/* Retention Rate Data */}
        <View style={styles.row}>
          <Text style={styles.cell}>Employees at Start: {retentionData[0].start}</Text>
          <Text style={styles.cell}>Employees at End: {retentionData[0].end}</Text>
          <Text style={styles.cell}>Retention Rate: {retentionRate}%</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button title={isEditMode ? 'Save Data' : 'Edit Data'} onPress={() => setIsEditMode(!isEditMode)} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  section: {
    marginBottom: 40,
    alignItems: 'center',
    width: '100%',
  },
  row: {
    marginVertical: 10,
  },
  cell: {
    fontSize: 14,
    marginBottom: 5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  ratingLabel: {
    fontSize: 14,
    marginRight: 10,
  },
  cellInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    width: '30%',
    borderRadius: 4,
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
  },
});

export default CombinedKPIsScreen;
