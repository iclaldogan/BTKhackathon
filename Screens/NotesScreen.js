import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function NotesScreen({ navigation }) {
  const [subjects, setSubjects] = useState({});
  const [selectedSubject, setSelectedSubject] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const handleAddNote = (subject) => {
    if (subject) {
      if (!subjects[subject]) {
        setSubjects((prevSubjects) => ({ ...prevSubjects, [subject]: [] }));
      }
      setSelectedSubject(subject);
      setModalVisible(false);
      navigation.navigate('NoteEditor', { subject, notes: subjects[subject], addNoteToSubject });
    }
  };

  const addNoteToSubject = (subject, noteText) => {
    setSubjects((prevSubjects) => ({
      ...prevSubjects,
      [subject]: [...prevSubjects[subject], noteText],
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notes</Text>

      <FlatList
        data={Object.keys(subjects)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.folder}
            onPress={() => navigation.navigate('NoteEditor', { subject: item, notes: subjects[item], addNoteToSubject })}
          >
            <MaterialIcons name="folder" size={28} color="#FF8A65" />
            <Text style={styles.folderText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
        <MaterialIcons name="add" size={28} color="#FFF" />
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select or Enter a Subject</Text>
            <FlatList
              data={Object.keys(subjects)}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedSubject(item);
                    handleAddNote(item);
                  }}
                  style={styles.subjectOption}
                >
                  <Text style={styles.subjectText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TextInput
              placeholder="Or enter a new subject"
              style={styles.input}
              value={selectedSubject}
              onChangeText={(text) => setSelectedSubject(text)}
            />
            <TouchableOpacity style={styles.modalButton} onPress={() => handleAddNote(selectedSubject)}>
              <Text style={styles.modalButtonText}>Add Note</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
              <Text style={[styles.modalButtonText, { color: 'red' }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  folder: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFEBB5',
    borderRadius: 15,
    marginVertical: 10,
  },
  folderText: {
    fontSize: 18,
    marginLeft: 15,
    color: '#333',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF8A65',
    padding: 15,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subjectOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  subjectText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#FF8A65',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
  modalButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#FFF',
  },
});
