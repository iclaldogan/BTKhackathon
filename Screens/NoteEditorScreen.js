import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function NoteEditorScreen({ route, navigation }) {
  const { subject, notes = [], addNoteToSubject } = route.params;
  const [noteText, setNoteText] = useState('');
  const [images, setImages] = useState([]);

  const handleAddImage = () => {
    // Simulate image upload
    const newImage = 'https://via.placeholder.com/150';
    setImages([...images, newImage]);
  };

  const handleSaveNote = () => {
    if (noteText.trim()) {
      addNoteToSubject(subject, { text: noteText, images });
      setNoteText('');
      setImages([]);
      Alert.alert('Success', 'Note added successfully!');
    } else {
      Alert.alert('Error', 'Please enter some text for your note.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Add Note - {subject}</Text>

      {/* Note Input */}
      <TextInput
        style={styles.input}
        placeholder="Type your note here..."
        value={noteText}
        onChangeText={setNoteText}
        multiline
      />

      {/* Image Preview */}
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Image source={{ uri: item }} style={styles.image} />}
        horizontal
        contentContainerStyle={styles.imageList}
      />

      {/* Button Container */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={handleAddImage}>
          <MaterialIcons name="photo" size={24} color="#FF8A65" />
          <Text style={styles.iconText}>Add Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
          <Text style={styles.saveButtonText}>Save Note</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Notes Display */}
      <Text style={styles.subheader}>Notes in {subject}</Text>
      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <Text style={styles.noteText}>{item.text}</Text>
            <FlatList
              data={item.images}
              keyExtractor={(image, index) => index.toString()}
              renderItem={({ item }) => <Image source={{ uri: item }} style={styles.noteImage} />}
              horizontal
              contentContainerStyle={styles.imageList}
            />
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3E0',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 15,
  },
  input: {
    borderColor: '#FFCCBC',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#FFF9E6',
  },
  imageList: {
    paddingVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    color: '#FF8A65',
    fontSize: 14,
    marginLeft: 5,
  },
  saveButton: {
    backgroundColor: '#FF8A65',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subheader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginVertical: 15,
  },
  noteItem: {
    backgroundColor: '#FFF9E6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  noteText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  noteImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 8,
  },
});
