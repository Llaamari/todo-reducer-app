
import { useReducer, useState } from 'react';
import type { Todo } from '../types/Todo';
import { todoReducer } from '../reducers/todoReducer';

// Defines the return type of the custom hook.
type UseTodosReturn = {
  todos: Todo[];
  newTodo: string;
  setNewTodo: (text: string) => void;
  addTodo: () => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
};

// Initial state of the task list
const initialTodos: Todo[] = [];

// Custom hook for managing todo state and actions.
export function useTodos(): UseTodosReturn {
  // useReducer
  const [todos, dispatch] = useReducer(
    todoReducer,
    initialTodos
  );

  const [newTodo, setNewTodo] = useState<string>('');

  // Adds a new task.
  const addTodo = (): void => {
    if (newTodo.trim() === '') {
      return;
    }

    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo.trim(),
      completed: false,
    };

    dispatch({
      type: 'ADD_TODO',
      payload: todo,
    });

    setNewTodo('');
  };

  // Removes a task by its ID.
  const removeTodo = (id: string): void => {
    dispatch({
      type: 'REMOVE_TODO',
      payload: id,
    });
  };

  // Toggles the completion status of a task.
  const toggleTodo = (id: string): void => {
    dispatch({
      type: 'TOGGLE_TODO',
      payload: id,
    });
  };

  // Data returned by a custom hook
  return {
    todos,
    newTodo,
    setNewTodo,
    addTodo,
    removeTodo,
    toggleTodo,
  };
}
