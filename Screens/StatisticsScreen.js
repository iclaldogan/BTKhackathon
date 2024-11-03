import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { GestureHandlerRootView, PinchGestureHandler, State } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;

// Data for line chart and pie chart
const lineChartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      data: [6, 8, 10, 7, 12, 8, 9],
      color: (opacity = 1) => `rgba(141, 211, 199, ${opacity})`, // Pastel teal
    }
  ]
};

const pieChartData = [
  { name: "Math", population: 40, color: "#FFADAD", legendFontColor: "#333", legendFontSize: 14 },
  { name: "Biology", population: 30, color: "#FFD6A5", legendFontColor: "#333", legendFontSize: 14 },
  { name: "Physics", population: 20, color: "#FDFFB6", legendFontColor: "#333", legendFontSize: 14 },
  { name: "Chemistry", population: 10, color: "#CAFFBF", legendFontColor: "#333", legendFontSize: 14 },
];

const allCoursesData = [
  { name: "Math", successRate: 75 },
  { name: "Biology", successRate: 63 },
  { name: "Physics", successRate: 68 },
  { name: "Chemistry", successRate: 72 },
  { name: "English", successRate: 80 },
  { name: "History", successRate: 78 },
  { name: "Geography", successRate: 65 },
];

export default function StatisticsScreen({ navigation }) {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Statistics</Text>

        {/* Line Chart with Pinch-to-Zoom */}
        <Text style={styles.subheader}>Daily Progress</Text>
        <PinchGestureHandler
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.END) {
              console.log('Zoom interaction complete.');
            }
          }}
        >
          <LineChart
            data={lineChartData}
            width={screenWidth - 40}
            height={250}
            yAxisSuffix="Q"
            chartConfig={{
              backgroundColor: '#FFF8E7',
              backgroundGradientFrom: '#E3F2FD',
              backgroundGradientTo: '#FFEBEE',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: { borderRadius: 16 },
            }}
            style={styles.chart}
            bezier
          />
        </PinchGestureHandler>

        {/* Pie Chart */}
        <Text style={styles.subheader}>Question Distribution by Subject</Text>
        <PieChart
          data={pieChartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          style={styles.pieChart}
        />

        {/* Success Rates by Course */}
        <Text style={styles.subheader}>Success Rate by Course</Text>
        <View style={styles.courseContainer}>
          {allCoursesData.map((course) => (
            <TouchableOpacity
              key={course.name}
              style={styles.courseItem}
              onPress={() => navigation.navigate(`${course.name}Statistics`)}
            >
              <Text style={styles.courseText}>{course.name}:</Text>
              <Text style={styles.courseSuccess}>{`${course.successRate}%`}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3E0',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  chart: {
    borderRadius: 15,
    marginVertical: 20,
  },
  pieChart: {
    marginVertical: 20,
  },
  subheader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 30,
    textAlign: 'center',
  },
  courseContainer: {
    marginTop: 20,
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  courseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  courseText: {
    fontSize: 18,
    color: '#333',
  },
  courseSuccess: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF8A65',
  },
});
