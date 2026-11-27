import type { ReactElement } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';
// Explicit typing in FlatList
import type { ListRenderItemInfo } from 'react-native';

import type { Todo } from './types/Todo';
import TodoItem from './components/TodoItem';
// Importing a custom hook
import { useTodos } from './hooks/useTodos';

export default function App(): ReactElement {
  // Calling a custom hook
  const {
    todos,
    newTodo,
    setNewTodo,
    addTodo,
    toggleTodo,
  } = useTodos();

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
        // This allows us to explicitly define the parameter and return type of the `renderItem` function.
        renderItem={(
          { item }: ListRenderItemInfo<Todo>
        ): ReactElement => (
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
