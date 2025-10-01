import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');
  const [editedTaskPriority, setEditedTaskPriority] = useState('orta');
  const [editedStartDate, setEditedStartDate] = useState('');
  const [editedEndDate, setEditedEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState('tumu'); // 'tumu', 'bugun', 'bu-hafta', 'gecmis', 'gelecek'

  // Local storage'dan taskları yükle
  useEffect(() => {
    loadTasks();
  }, []);

  // Tasklar değiştiğinde local storage'a kaydet
  useEffect(() => {
    if (!isLoading) {
      saveTasks();
    }
  }, [tasks]);

  const loadTasks = () => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks !== null) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Tasklar yüklenirken hata oluştu:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTasks = () => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Tasklar kaydedilirken hata oluştu:', error);
    }
  };

  // Tarih filtreleme fonksiyonu
  const filterTasksByDate = () => {
    if (dateFilter === 'tumu') {
      return tasks;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return tasks.filter(task => {
      if (!task.startDate && !task.endDate) {
        return dateFilter === 'tumu';
      }

      const parseDate = (dateStr) => {
        if (!dateStr) return null;
        const parts = dateStr.split('/');
        if (parts.length === 3) {
          return new Date(parts[2], parts[1] - 1, parts[0]);
        }
        return null;
      };

      const startDate = parseDate(task.startDate);
      const endDate = parseDate(task.endDate);

      switch (dateFilter) {
        case 'bugun':
          if (startDate) {
            startDate.setHours(0, 0, 0, 0);
            if (startDate.getTime() === today.getTime()) return true;
          }
          if (endDate) {
            endDate.setHours(0, 0, 0, 0);
            if (endDate.getTime() === today.getTime()) return true;
          }
          if (startDate && endDate) {
            return startDate <= today && endDate >= today;
          }
          return false;

        case 'bu-hafta':
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          
          if (startDate && startDate >= weekStart && startDate <= weekEnd) return true;
          if (endDate && endDate >= weekStart && endDate <= weekEnd) return true;
          if (startDate && endDate && startDate <= weekEnd && endDate >= weekStart) return true;
          return false;

        case 'gecmis':
          if (endDate && endDate < today) return true;
          return false;

        case 'gelecek':
          if (startDate && startDate > today) return true;
          return false;

        default:
          return true;
      }
    });
  };

  const filteredTasks = filterTasksByDate();

  const addTask = () => {
    if (task.trim().length > 0) {
      setTasks([
        ...tasks,
        { 
          id: Date.now().toString(), 
          text: task, 
          completed: false, 
          priority: 'orta',
          startDate: '',
          endDate: ''
        },
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

  const openTaskDetail = (item) => {
    setSelectedTask(item);
    setEditedTaskText(item.text);
    setEditedTaskPriority(item.priority || 'orta');
    setEditedStartDate(item.startDate || '');
    setEditedEndDate(item.endDate || '');
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTask(null);
    setEditedTaskText('');
    setEditedTaskPriority('orta');
    setEditedStartDate('');
    setEditedEndDate('');
  };

  const updateTask = () => {
    if (editedTaskText.trim().length > 0) {
      setTasks(
        tasks.map((item) =>
          item.id === selectedTask.id 
            ? { 
                ...item, 
                text: editedTaskText, 
                priority: editedTaskPriority,
                startDate: editedStartDate,
                endDate: editedEndDate
              } 
            : item
        )
      );
      closeModal();
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity
        onPress={() => toggleTask(item.id)}
        style={styles.checkboxTouchable}
      >
        <View
          style={[
            styles.checkbox,
            item.completed && styles.checkboxCompleted,
          ]}
        >
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.taskTextContainer}
        onPress={() => openTaskDetail(item)}
      >
        <Text
          style={[
            styles.taskText,
            item.completed && styles.taskTextCompleted,
          ]}
        >
          {item.text}
        </Text>
        {item.priority && (
          <View style={[
            styles.priorityBadge,
            item.priority === 'düşük' && styles.priorityBadgeLow,
            item.priority === 'orta' && styles.priorityBadgeMedium,
            item.priority === 'yüksek' && styles.priorityBadgeHigh,
          ]}>
            <Text style={styles.priorityBadgeText}>
              {item.priority === 'düşük' ? '🟢 Düşük' : 
               item.priority === 'orta' ? '🟡 Orta' : 
               '🔴 Yüksek'}
            </Text>
          </View>
        )}
        {(item.startDate || item.endDate) && (
          <View style={styles.dateContainer}>
            {item.startDate && (
              <Text style={styles.dateText}>📅 Başlangıç: {item.startDate}</Text>
            )}
            {item.endDate && (
              <Text style={styles.dateText}>🏁 Bitiş: {item.endDate}</Text>
            )}
          </View>
        )}
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

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, dateFilter === 'tumu' && styles.filterButtonActive]}
          onPress={() => setDateFilter('tumu')}
        >
          <Text style={[styles.filterButtonText, dateFilter === 'tumu' && styles.filterButtonTextActive]}>
            Tümü
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, dateFilter === 'bugun' && styles.filterButtonActive]}
          onPress={() => setDateFilter('bugun')}
        >
          <Text style={[styles.filterButtonText, dateFilter === 'bugun' && styles.filterButtonTextActive]}>
            Bugün
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, dateFilter === 'bu-hafta' && styles.filterButtonActive]}
          onPress={() => setDateFilter('bu-hafta')}
        >
          <Text style={[styles.filterButtonText, dateFilter === 'bu-hafta' && styles.filterButtonTextActive]}>
            Bu Hafta
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, dateFilter === 'gecmis' && styles.filterButtonActive]}
          onPress={() => setDateFilter('gecmis')}
        >
          <Text style={[styles.filterButtonText, dateFilter === 'gecmis' && styles.filterButtonTextActive]}>
            Geçmiş
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, dateFilter === 'gelecek' && styles.filterButtonActive]}
          onPress={() => setDateFilter('gelecek')}
        >
          <Text style={[styles.filterButtonText, dateFilter === 'gelecek' && styles.filterButtonTextActive]}>
            Gelecek
          </Text>
        </TouchableOpacity>
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
        data={filteredTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.taskList}
        contentContainerStyle={styles.taskListContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {dateFilter === 'tumu' 
                ? 'Henüz görev yok. Yeni bir görev ekleyin!'
                : 'Bu filtrede görev bulunamadı.'}
            </Text>
          </View>
        }
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Görevi Düzenle</Text>
            
            <TextInput
              style={styles.modalInput}
              value={editedTaskText}
              onChangeText={setEditedTaskText}
              multiline
              autoFocus
            />
            
            <Text style={styles.priorityLabel}>Önem Sırası</Text>
            <View style={styles.priorityContainer}>
              <TouchableOpacity
                style={[
                  styles.priorityButton,
                  editedTaskPriority === 'düşük' && styles.priorityButtonLow,
                ]}
                onPress={() => setEditedTaskPriority('düşük')}
              >
                <Text style={[
                  styles.priorityButtonText,
                  editedTaskPriority === 'düşük' && styles.priorityButtonTextActive,
                ]}>
                  Düşük
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.priorityButton,
                  editedTaskPriority === 'orta' && styles.priorityButtonMedium,
                ]}
                onPress={() => setEditedTaskPriority('orta')}
              >
                <Text style={[
                  styles.priorityButtonText,
                  editedTaskPriority === 'orta' && styles.priorityButtonTextActive,
                ]}>
                  Orta
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.priorityButton,
                  editedTaskPriority === 'yüksek' && styles.priorityButtonHigh,
                ]}
                onPress={() => setEditedTaskPriority('yüksek')}
              >
                <Text style={[
                  styles.priorityButtonText,
                  editedTaskPriority === 'yüksek' && styles.priorityButtonTextActive,
                ]}>
                  Yüksek
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.dateLabel}>Tarihler</Text>
            <View style={styles.dateInputContainer}>
              <View style={styles.dateInputWrapper}>
                <Text style={styles.dateInputLabel}>Başlangıç Tarihi</Text>
                <TextInput
                  style={styles.dateInput}
                  value={editedStartDate}
                  onChangeText={setEditedStartDate}
                  placeholder="GG/AA/YYYY"
                  placeholderTextColor="#999"
                />
              </View>
              <View style={styles.dateInputWrapper}>
                <Text style={styles.dateInputLabel}>Bitiş Tarihi</Text>
                <TextInput
                  style={styles.dateInput}
                  value={editedEndDate}
                  onChangeText={setEditedEndDate}
                  placeholder="GG/AA/YYYY"
                  placeholderTextColor="#999"
                />
              </View>
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={closeModal}
              >
                <Text style={styles.cancelButtonText}>İptal</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={updateTask}
              >
                <Text style={styles.saveButtonText}>Kaydet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterButtonActive: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  filterButtonText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  filterButtonTextActive: {
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
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
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
  checkboxTouchable: {
    padding: 5,
  },
  taskTextContainer: {
    flex: 1,
    paddingVertical: 5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6200ee',
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
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  priorityBadgeLow: {
    backgroundColor: '#e8f5e9',
  },
  priorityBadgeMedium: {
    backgroundColor: '#fff3e0',
  },
  priorityBadgeHigh: {
    backgroundColor: '#ffebee',
  },
  priorityBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  dateContainer: {
    marginTop: 8,
    gap: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '85%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#6200ee',
    marginLeft: 10,
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  priorityLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  priorityButtonLow: {
    backgroundColor: '#e8f5e9',
    borderColor: '#4caf50',
  },
  priorityButtonMedium: {
    backgroundColor: '#fff3e0',
    borderColor: '#ff9800',
  },
  priorityButtonHigh: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
  },
  priorityButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  priorityButtonTextActive: {
    color: '#333',
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  dateInputContainer: {
    marginBottom: 20,
    gap: 12,
  },
  dateInputWrapper: {
    gap: 6,
  },
  dateInputLabel: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
});

