import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Circle } from 'react-native-progress';

export default function ProfileScreen() {
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1); // 31 days for a full month

  const getDayColor = (day) => {
    const questionsSolved = Math.floor(Math.random() * 10); // Random value for demo
    return `rgba(255, 123, 84, ${0.3 + 0.07 * questionsSolved})`; // Adjust intensity
  };

  return (
    <View style={styles.container}>
      {/* Profile Header with Background */}
      <Image
        source={{ uri: 'https://via.placeholder.com/400x200' }} // Background profile image
        style={styles.backgroundImage}
      />
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/80' }} // Placeholder profile image
          style={styles.profileImage}
        />
        <Text style={styles.username}>username</Text>
        <TouchableOpacity style={styles.editButton}>
          <MaterialIcons name="edit" size={18} color="#fff" />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>2670</Text>
          <Text style={styles.statLabel}>Donations</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>692</Text>
          <Text style={styles.statLabel}>Tokens</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>115h</Text>
          <Text style={styles.statLabel}>Time</Text>
        </View>
      </View>

      {/* Additional Information Section */}
      <View style={styles.infoSection}>
        <TouchableOpacity style={styles.infoBox}>
          <MaterialIcons name="calendar-today" size={24} color="#FF8A65" />
          <Text style={styles.infoLabel}>Monthly Activity</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoBox}>
          <MaterialIcons name="post-add" size={24} color="#FFD54F" />
          <Text style={styles.infoLabel}>Posts Created</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoBox}>
          <MaterialIcons name="group" size={24} color="#4FC3F7" />
          <Text style={styles.infoLabel}>Friends</Text>
        </TouchableOpacity>
      </View>

      {/* Circular Monthly Activity */}
      <Text style={styles.sectionTitle}>Monthly Activity</Text>
      <Text style={styles.dateText}>October 2024</Text>
      <View style={styles.activityCircle}>
        {daysInMonth.map((day) => (
          <View key={day} style={[styles.dayDot, { backgroundColor: getDayColor(day) }]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff8e7',
  },
  backgroundImage: {
    width: '100%',
    height: 150,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -40,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: '#fff',
    borderWidth: 3,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#ff7b54',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '500',
    marginLeft: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#888',
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  infoBox: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 10,
  },
  activityCircle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    width: 300, // Increase the width for a larger circle
    height: 300, // Increase the height for a larger circle
    borderRadius: 140, // Half of the width/height for a perfect circle
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  dayDot: {
    width: 35, // Increase width for better visibility
    height: 35, // Increase height for better visibility
    borderRadius: 15,
    margin: 4, // Adjust spacing as needed
  },
});

