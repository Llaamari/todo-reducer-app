
import type { Todo } from '../types/Todo';
import type { TodoAction } from '../types/TodoAction';

// Handles changes to the todo list state.
export function todoReducer(
  state: Todo[],
  action: TodoAction
): Todo[] {
  // Switch statement
  switch (action.type) {
    // ADD_TODO. Adding a task
    case 'ADD_TODO':
      return [...state, action.payload];

    // REMOVE_TODO. Deleting a task
    case 'REMOVE_TODO':
      return state.filter(
        // This is where all tasks whose IDs do not match the ID of the task to be deleted are stored.
        (todo: Todo): boolean => todo.id !== action.payload
      );

    // TOGGLE_TODO. Changing a task's status
    case 'TOGGLE_TODO':
      return state.map(
        (todo: Todo): Todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
      );

    default:
      return state;
  }
}
