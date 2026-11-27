import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Todo } from './types/Todo';
import TodoItem from './components/TodoItem';

// Storage key
const STORAGE_KEY: string = '@todo_list_tasks';

export default function App(): ReactElement {
  // Task list status variable
  const [todos, setTodos] = useState<Todo[]>([]);
  // Text field status variable
  const [newTodo, setNewTodo] = useState<string>('');
  // Defining the loading mode
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load saved tasks when the app starts.
  useEffect((): void => {
    const loadTodos = async (): Promise<void> => {
      try {
        // Downloading assignments
        const storedTodos: string | null =
          await AsyncStorage.getItem(STORAGE_KEY);

        // Convert the saved JSON string back into a task table and set it as the application's state.
        if (storedTodos !== null) {
          const parsedTodos: Todo[] = JSON.parse(storedTodos);
          setTodos(parsedTodos);
        }
      } catch (error: unknown) {
        console.error('Error loading tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    void loadTodos();
  }, []);

  // Save tasks whenever the task list changes.
  useEffect((): void => {
    if (isLoading) {
      return;
    }

    const saveTodos = async (): Promise<void> => {
      try {
        // Saving tasks
        const jsonValue: string = JSON.stringify(todos);
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      } catch (error: unknown) {
        console.error('Error saving tasks:', error);
      }
    };

    void saveTodos();
  }, [todos, isLoading]);

  // Function return type
  const addTodo = (): void => {
    if (newTodo.trim() === '') {
      return;
    }

    // Creating a new task
    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo.trim(),
      completed: false,
    };

    setTodos((previousTodos: Todo[]) => [...previousTodos, todo]);
    setNewTodo('');
  };

  const toggleTodo = (id: string): void => {
    // Go through all the tasks and create a new table.
    setTodos((previousTodos: Todo[]) =>
      previousTodos.map((todo: Todo) =>
        todo.id === id
    // If the identifier matches, the following is performed
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading tasks...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Todo List</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a new task"
        value={newTodo}
        onChangeText={setNewTodo}
      />

      <Button title="Add Task" onPress={addTodo} />

      {/* A list whose elements are of type “Todo” */}
      <FlatList<Todo>
        data={todos}
        keyExtractor={(item: Todo): string => item.id}
        renderItem={({ item }) => (
          <TodoItem todo={item} onToggle={toggleTodo} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
