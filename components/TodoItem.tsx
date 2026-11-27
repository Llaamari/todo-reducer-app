
import type { ReactElement } from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';

import type { Todo } from '../types/Todo';

// Defines the props of the TodoItem component.
type TodoItemProps = {
  todo: Todo;
  // TypeScript definition
  onToggle: (id: string) => void;
  // Added a new feature that specifies that the component receives a function that takes a string-form identifier as a parameter and does not return a value.
  onRemove: (id: string) => void;
};

// Define the function's return type as ReactElement.
export default function TodoItem({
  todo,
  onToggle,
  onRemove,
}: TodoItemProps): ReactElement {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.task}
        onPress={() => onToggle(todo.id)}
      >
        <Text
          // Retained the correction to the overline problem
          key={`${todo.id}-${todo.completed}`}
          style={{
            fontSize: 18,
            color: todo.completed ? '#888888' : '#000000',
            textDecorationLine: todo.completed
              ? 'line-through'
              : 'none',
          }}
        >
          {todo.text}
        </Text>
      </Pressable>

      {/* The delete button */}
      <Pressable
        style={styles.removeButton}
        onPress={() => onRemove(todo.id)}
      >
        <Text style={styles.removeButtonText}>
          DELETE
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // Flexbox layout
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  task: {
    flex: 1,
    marginRight: 10,
  },
  removeButton: {
    backgroundColor: '#C62828',
    padding: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
