import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { PDFDocument } from 'pdf-lib';
import client from '../gemini/apiClient';
import Papa from 'papaparse';

export default function CreateQuestionScreen() {
  const [isUploading, setIsUploading] = useState(false);
  const [isFineTuning, setIsFineTuning] = useState(false);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('Easy');
  const [generatedQuestions, setGeneratedQuestions] = useState([]);

  const handleUpload = async () => {
    try {
      setIsUploading(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "text/csv", "text/plain"],
      });

      if (result.type === 'success') {
        console.log('File selected:', result.name);
        const fileType = result.name.split('.').pop().toLowerCase();
        let extractedSections;

        if (fileType === 'pdf') {
          extractedSections = await parsePDFContent(result.uri);
        } else if (fileType === 'csv') {
          const csvContent = await FileSystem.readAsStringAsync(result.uri);
          extractedSections = parseCSVContent(csvContent);
        } else if (fileType === 'txt') {
          const textContent = await FileSystem.readAsStringAsync(result.uri);
          extractedSections = [{ id: '1', title: 'Text File Content', content: textContent }];
        } else {
          alert('Unsupported file format. Please upload .csv, .txt, or .pdf files only.');
          console.log('Unsupported file format:', fileType);
        }

        if (extractedSections) {
          console.log('Parsed sections:', extractedSections);
          setSections(extractedSections);
        } else {
          Alert.alert('Error', 'No sections found in the uploaded file.');
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      Alert.alert("Error", "Failed to upload or parse the file.");
    } finally {
      setIsUploading(false);
    }
  };

  const parsePDFContent = async (fileUri) => {
    try {
      console.log('Attempting to parse PDF content');
      const fileBytes = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
      const pdfDoc = await PDFDocument.load(fileBytes);
      const pages = pdfDoc.getPages();

      const sections = await Promise.all(
        pages.map(async (page, index) => {
          const content = page.getTextContent ? await page.getTextContent() : 'Text extraction not supported';
          return {
            id: `${index}`,
            title: `Page ${index + 1}`,
            content: content,
          };
        })
      );

      console.log('Extracted sections from PDF:', sections);
      return sections;
    } catch (error) {
      console.error("Error parsing PDF:", error);
      Alert.alert("Error", "Failed to parse PDF content. Try a different file.");
      return [];
    }
  };

  const parseCSVContent = (csvContent) => {
    console.log('Parsing CSV content');
    const parsedData = Papa.parse(csvContent, { header: true });
    const sections = parsedData.data.map((row, index) => ({
      id: `${index}`,
      title: row.title || `Section ${index + 1}`,
      content: JSON.stringify(row),
    }));
    console.log('Extracted sections from CSV:', sections);
    return sections;
  };

  const generateQuestions = async () => {
    if (!selectedSection) {
      Alert.alert('Select a Section', 'Please select a section to generate questions.');
      return;
    }

    setIsFineTuning(true);
    try {
      console.log(`Generating ${numberOfQuestions} ${difficulty} questions on ${selectedSection.title}`);
      const prompt = `Generate ${numberOfQuestions} ${difficulty} questions on ${selectedSection.title}.`;

      const response = await client.generateText({
        model: 'gemini-1.5-flash',
        prompt,
      });

      const generatedQuestionsText = response.data.text;
      console.log('Generated questions:', generatedQuestionsText);
      setGeneratedQuestions(generatedQuestionsText.split('\n'));
    } catch (error) {
      console.error("Error generating questions:", error);
      Alert.alert("Error", "Failed to generate questions. Please try again.");
    } finally {
      setIsFineTuning(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Question</Text>

      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <MaterialIcons name="cloud-upload" size={30} color="#fff" />
        <Text style={styles.uploadText}>Upload/Scan Book</Text>
      </TouchableOpacity>
      {isUploading && <ActivityIndicator size="large" color="#ff7b54" style={styles.loader} />}

      <Text style={styles.sectionTitle}>Select a Section</Text>
      <FlatList
        data={sections}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.sectionItem, selectedSection === item && styles.sectionItemSelected]}
            onPress={() => setSelectedSection(item)}
          >
            <Text style={styles.sectionText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />

      {isFineTuning && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ff7b54" />
          <Text style={styles.loadingText}>Fine-tuning with AI...</Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Configure Questions</Text>
      <View style={styles.configurationContainer}>
        <Text style={styles.configurationText}>Number of Questions: {numberOfQuestions}</Text>
        <Slider
          minimumValue={5}
          maximumValue={50}
          step={1}
          value={numberOfQuestions}
          onValueChange={(value) => setNumberOfQuestions(value)}
          style={styles.slider}
          minimumTrackTintColor="#ff7b54"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#ff7b54"
        />

        <Text style={styles.configurationText}>Difficulty Level</Text>
        <View style={styles.difficultyContainer}>
          {['Easy', 'Medium', 'Hard'].map((level) => (
            <TouchableOpacity
              key={level}
              style={[styles.difficultyButton, difficulty === level && styles.difficultySelected]}
              onPress={() => setDifficulty(level)}
            >
              <Text style={[styles.difficultyText, difficulty === level && styles.difficultyTextSelected]}>
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.continueButton, !selectedSection && styles.disabledButton]}
        disabled={!selectedSection}
        onPress={generateQuestions}
      >
        <Text style={styles.continueText}>Generate Questions</Text>
      </TouchableOpacity>

      {generatedQuestions.length > 0 && (
        <View style={styles.generatedQuestionsContainer}>
          <Text style={styles.sectionTitle}>Generated Questions:</Text>
          {generatedQuestions.map((question, index) => (
            <Text key={index} style={styles.generatedQuestionText}>
              {index + 1}. {question}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f4f0',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    alignSelf: 'center',
  },
  uploadButton: {
    flexDirection: 'row',
    backgroundColor: '#ff7b54',
    padding: 15,
    borderRadius: 15,
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
  configurationContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  configurationText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  difficultyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  difficultyButton: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  difficultySelected: {
    backgroundColor: '#ff7b54',
  },
  difficultyText: {
    fontSize: 16,
    color: '#333',
  },
  difficultyTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
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
  generatedQuestionsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  generatedQuestionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});


