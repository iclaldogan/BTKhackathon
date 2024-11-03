import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function TaskScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task) {
      setTasks([...tasks, { key: `${tasks.length + 1}`, name: task }]);
      setTask('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tasks</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Task"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Add Task" onPress={addTask} />

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item.name}</Text>
            <Button title="Start Focus" onPress={() => console.log('Focus started')} />
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
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  taskItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
