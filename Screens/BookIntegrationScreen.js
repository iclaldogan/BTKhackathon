import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function BookIntegrationScreen() {
  const [isUploading, setIsUploading] = useState(false);
  const [isFineTuning, setIsFineTuning] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  // Placeholder data for book sections
  const sections = [
    { id: '1', title: 'Chapter 1: Algebra' },
    { id: '2', title: 'Chapter 2: Geometry' },
    { id: '3', title: 'Chapter 3: Trigonometry' },
    { id: '4', title: 'Chapter 4: Calculus' },
  ];

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsFineTuning(true);
      setTimeout(() => setIsFineTuning(false), 3000);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Book Integration</Text>

      {/* Upload/Scan Section */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <MaterialIcons name="cloud-upload" size={30} color="#fff" />
        <Text style={styles.uploadText}>Upload/Scan Book</Text>
      </TouchableOpacity>
      {isUploading && <ActivityIndicator size="large" color="#ff7b54" style={styles.loader} />}

      {/* Section Selection */}
      <Text style={styles.sectionTitle}>Select a Section</Text>
      <FlatList
        data={sections}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.sectionItem,
              selectedSection === item.id && styles.sectionItemSelected,
            ]}
            onPress={() => setSelectedSection(item.id)}
          >
            <Text style={styles.sectionText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />

      {/* AI Fine-Tuning Animation */}
      {isFineTuning && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ff7b54" />
          <Text style={styles.loadingText}>Fine-tuning with AI...</Text>
        </View>
      )}

      {/* Continue Button */}
      <TouchableOpacity
        style={[
          styles.continueButton,
          !selectedSection && styles.disabledButton
        ]}
        disabled={!selectedSection}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  uploadButton: {
    flexDirection: 'row',
    backgroundColor: '#ff7b54',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  uploadText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  loader: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginVertical: 10,
  },
  sectionItem: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#e0f7fa',
    marginVertical: 5,
  },
  sectionItemSelected: {
    backgroundColor: '#b2ebf2',
  },
  sectionText: {
    fontSize: 16,
    color: '#00796b',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#ff7b54',
    marginLeft: 10,
  },
  continueButton: {
    backgroundColor: '#ff7b54',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  continueText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ffcccb',
  },
});
