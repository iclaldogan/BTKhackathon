import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.topNav}>
        <Text style={styles.appName}>Apps Name</Text>
        <TouchableOpacity style={styles.notificationIcon}>
          <MaterialIcons name="notifications" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Greeting Section */}
      <View style={styles.greetingSection}>
        <Text style={styles.greeting}> Greetings, [User]!</Text>
      </View>

      {/* Action Cards */}
      <View style={styles.cardsContainer}>
        <TouchableOpacity
          style={[styles.card, styles.cardPrimary]}
          onPress={() => navigation.navigate('CreateQuestion')}
        >
          <View style={styles.iconContainer}>
            <MaterialIcons name="create" size={30} color="#fff" />
          </View>
          <Text style={styles.cardText}>Create Question</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardSecondary]}
          onPress={() => navigation.navigate('QuestionSolution')}
        >
          <View style={styles.iconContainer}>
            <MaterialIcons name="question-answer" size={30} color="#fff" />
          </View>
          <Text style={styles.cardText}>Question Solution</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardTertiary]}
          onPress={() => navigation.navigate('ExamControl')}
        >
          <View style={styles.iconContainer}>
            <MaterialIcons name="assignment" size={30} color="#fff" />
          </View>
          <Text style={styles.cardText}>Exam Control</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardQuaternary]}
          onPress={() => navigation.navigate('Notes')}
        >
          <View style={styles.iconContainer}>
            <MaterialIcons name="note-add" size={30} color="#fff" />
          </View>
          <Text style={styles.cardText}>Notes</Text>
        </TouchableOpacity>
      </View>

      {/* Insight Box */}
      <View style={styles.insightBox}>
        <Text style={styles.insightText}>Today's Insight: Review key points from Algebra!</Text>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <MaterialIcons name="home" size={28} color="#FF8A65" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Statistics')}>
          <MaterialIcons name="bar-chart" size={28} color="#FF8A65" />
          <Text style={styles.navText}>Statistics</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <MaterialIcons name="person" size={28} color="#FF8A65" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3E0',
    paddingHorizontal: 20,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationIcon: {
    paddingRight: 10,
  },
  greetingSection: {
    alignItems: 'center',
    marginVertical: 10,
  },
  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  card: {
    width: screenWidth * 0.42,
    height: 120,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  cardPrimary: {
    backgroundColor: '#FF8A65',
  },
  cardSecondary: {
    backgroundColor: '#FFD54F',
  },
  cardTertiary: {
    backgroundColor: '#4FC3F7',
  },
  cardQuaternary: {
    backgroundColor: '#A5D6A7',
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    padding: 10,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  insightBox: {
    backgroundColor: '#FFEB3B',
    borderRadius: 10,
    padding: 15,
    marginVertical: 20,
    alignItems: 'center',
  },
  insightText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#FAF3E0',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 15,
  },
  navText: {
    fontSize: 12,
    color: '#FF8A65',
    textAlign: 'center',
    marginTop: 4,
  },
});
