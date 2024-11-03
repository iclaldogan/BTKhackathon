import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ExamControlScreen() {
  const [exams, setExams] = useState([
    { id: '1', title: 'Math Exam 1', score: '85%', date: '2023-01-01', feedback: 'Good performance overall.' },
    { id: '2', title: 'Science Quiz', score: '90%', date: '2023-01-10', feedback: 'Excellent understanding of topics.' },
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleNewExamUpload = (source) => {
    setIsUploading(true);
    setUploadStatus(`Uploading photo from ${source}...`);

    setTimeout(() => {
      setIsUploading(false);
      setUploadStatus('Exam uploaded and evaluated successfully!');
      
      const newExam = {
        id: (exams.length + 1).toString(),
        title: `New Exam ${exams.length + 1}`,
        score: `${Math.floor(Math.random() * 21) + 80}%`, // Random score between 80-100%
        date: new Date().toISOString().split('T')[0],
        feedback: 'AI feedback for the exam uploaded.',
      };
      setExams([newExam, ...exams]);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Exam Control</Text>

      {/* Upload New Exam Section */}
      <View style={styles.uploadContainer}>
        <Text style={styles.subheader}>Upload New Exam</Text>
        <View style={styles.uploadButtons}>
          <TouchableOpacity style={styles.iconButton} onPress={() => handleNewExamUpload('Camera')}>
            <MaterialIcons name="photo-camera" size={28} color="#FF8A65" />
            <Text style={styles.iconText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => handleNewExamUpload('Gallery')}>
            <MaterialIcons name="photo-library" size={28} color="#FF8A65" />
            <Text style={styles.iconText}>Gallery</Text>
          </TouchableOpacity>
        </View>

        {/* Upload Status */}
        {isUploading && <ActivityIndicator size="large" color="#FF8A65" style={styles.loader} />}
        {uploadStatus ? <Text style={styles.uploadStatus}>{uploadStatus}</Text> : null}
      </View>

      {/* Previous Exams Section */}
      <Text style={styles.subheader}>Previous Exams</Text>
      <FlatList
        data={exams}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.examItem}>
            <View style={styles.examInfo}>
              <Text style={styles.examTitle}>{item.title}</Text>
              <Text style={styles.examDate}>Date: {item.date}</Text>
              <Text style={styles.examScore}>Score: {item.score}</Text>
              <Text style={styles.examFeedback}>{item.feedback}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAF3E0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginVertical: 10,
  },
  uploadContainer: {
    marginBottom: 20,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
  uploadButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  iconButton: {
    alignItems: 'center',
  },
  iconText: {
    color: '#FF8A65',
    fontSize: 14,
    fontWeight: '500',
  },
  loader: {
    marginTop: 10,
  },
  uploadStatus: {
    marginTop: 10,
    color: 'green',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  examItem: {
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
  examInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  examTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  examDate: {
    fontSize: 14,
    color: '#777',
  },
  examScore: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF8A65',
  },
  examFeedback: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});
