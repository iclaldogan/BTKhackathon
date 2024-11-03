import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function QuestionSolutionScreen() {
  const [questionText, setQuestionText] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [aiAnswer, setAiAnswer] = useState('');
  const [recentQuestions, setRecentQuestions] = useState([]);

  const handleUpload = (source) => {
    setUploadStatus(`Photo uploaded from ${source}!`);
    setUploadedImage('https://via.placeholder.com/150');

    setTimeout(() => {
      const answer = 'This is the answer provided by the AI for the uploaded question.';
      setAiAnswer(answer);
      addRecentQuestion(`Image from ${source}`, answer);
    }, 2000);
  };

  const handleQuestionSubmit = () => {
    const answer = 'This is the answer provided by the AI for the submitted question.';
    setAiAnswer(answer);
    addRecentQuestion(questionText, answer);
    setQuestionText('');
  };

  const addRecentQuestion = (question, answer) => {
    const newQuestion = { question, answer };
    setRecentQuestions((prevQuestions) => [newQuestion, ...prevQuestions].slice(0, 5)); 
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Ask a Question</Text>
      
      {/* Question Input */}
      <TextInput
        style={styles.input}
        placeholder="Paste your question here"
        value={questionText}
        onChangeText={setQuestionText}
        multiline
      />
      
      {/* Submit Question Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleQuestionSubmit}>
        <Text style={styles.submitButtonText}>Get Answer</Text>
      </TouchableOpacity>
      
      {/* Upload Options */}
      <View style={styles.uploadContainer}>
        <Text style={styles.uploadText}>Or Upload an Image of Your Question</Text>
        
        <View style={styles.uploadButtons}>
          <TouchableOpacity style={styles.iconButton} onPress={() => handleUpload('Camera')}>
            <MaterialIcons name="photo-camera" size={28} color="#ff7b54" />
            <Text style={styles.iconText}>Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={() => handleUpload('Gallery')}>
            <MaterialIcons name="photo-library" size={28} color="#ff7b54" />
            <Text style={styles.iconText}>Gallery</Text>
          </TouchableOpacity>
        </View>
        
        {/* Upload Status */}
        {uploadStatus ? <Text style={styles.uploadStatus}>{uploadStatus}</Text> : null}
        
        {/* Image Preview */}
        {uploadedImage && (
          <Image source={{ uri: uploadedImage }} style={styles.uploadedImage} />
        )}
      </View>

      {/* AI Answer Display */}
      {aiAnswer ? (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{aiAnswer}</Text>
        </View>
      ) : null}

      {/* Recent Questions */}
      <Text style={styles.recentHeader}>Recent Questions</Text>
      <FlatList
        data={recentQuestions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.recentQuestionItem}>
            <Text style={styles.recentQuestionText}>Q: {item.question}</Text>
            <Text style={styles.recentAnswerText}>A: {item.answer}</Text>
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
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    textAlignVertical: 'top',
    minHeight: 80,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#FF8A65',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  uploadContainer: {
    marginTop: 20,
  },
  uploadText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
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
  uploadStatus: {
    marginTop: 10,
    color: 'green',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  uploadedImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginTop: 15,
    alignSelf: 'center',
  },
  answerContainer: {
    backgroundColor: '#E0F7FA',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
  },
  answerText: {
    fontSize: 16,
    color: '#00796B',
    fontWeight: '500',
    textAlign: 'center',
  },
  recentHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  recentQuestionItem: {
    backgroundColor: '#F9F9F9',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  recentQuestionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  recentAnswerText: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
});
