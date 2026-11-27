
import type { ReactElement } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import type { Todo } from '../types/Todo';

// This specifies what data can be passed to the TodoItem component.
type TodoItemProps = {
  todo: Todo;
  // TypeScript definition
  onToggle: (id: string) => void;
};

// Define the function's return type as ReactElement.
export default function TodoItem({
  todo,
  onToggle,
}: TodoItemProps): ReactElement {
  return (
    // Pressable makes the entire task list printable.
    <Pressable
      style={styles.container}
      onPress={() => onToggle(todo.id)}
    >
      <Text
        // Tells React the component's identity.
        key={`${todo.id}-${todo.completed}`}
        // Conditional style
        style={{
          fontSize: 18,
          color: todo.completed ? '#888888' : '#000000',
          textDecorationLine: todo.completed ? 'line-through' : 'none',
        }}
      >
        {todo.text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});
