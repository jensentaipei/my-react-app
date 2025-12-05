import { create } from "zustand";
import { persist } from 'zustand/middleware'

export interface TodoItem {
  id: string;
  title: string;
  content: string;
  tag: string;
  completed: boolean;
}

interface TodoItemsStore {
  todoItems: TodoItem[];
  addTodoItem: (todoItem: TodoItem) => void;
  updateTodoItem: (id: string, todoItem: TodoItem) => void;
  removeTodoItem: (id: string) => void;
}

const useTodoItemsStore = create<TodoItemsStore>()(
  persist((set, get) => ({
    todoItems: [],
    addTodoItem: (todoItem) => {
      if (get().todoItems.map((t) => t.id).includes(todoItem.id)) {
      return;
    }
    set((state) => ({ todoItems: [...state.todoItems, todoItem] }));
  },
  updateTodoItem: (id, todoItem) => {
    set((state) => ({
      todoItems: state.todoItems.map((t) => (t.id === id ? todoItem : t)),
    }));
  },
  removeTodoItem: (id) =>
      set((state) => ({ todoItems: state.todoItems.filter((t) => t.id !== id) })),
  }),
  {
    name: "todoItems",
  }
));

export default useTodoItemsStore;