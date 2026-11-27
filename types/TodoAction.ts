
import type { Todo } from './Todo';

// Defines the possible actions for the todo reducer.
export type TodoAction =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'REMOVE_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string };
