import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim().length > 0) {
      setTasks([
        ...tasks,
        { id: Date.now().toString(), text: task, completed: false },
      ]);
      setTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity
        style={styles.taskTextContainer}
        onPress={() => toggleTask(item.id)}
      >
        <View
          style={[
            styles.checkbox,
            item.completed && styles.checkboxCompleted,
          ]}
        >
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text
          style={[
            styles.taskText,
            item.completed && styles.taskTextCompleted,
          ]}
        >
          {item.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => deleteTask(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Yapılacaklar</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Yeni görev ekle..."
          value={task}
          onChangeText={setTask}
          onSubmitEditing={addTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.taskList}
        contentContainerStyle={styles.taskListContent}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6200ee',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#6200ee',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  addButtonText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  taskList: {
    flex: 1,
  },
  taskListContent: {
    padding: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6200ee',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#6200ee',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 30,
    color: '#ff3b30',
    fontWeight: 'bold',
  },
});

