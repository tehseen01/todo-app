import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITodo {
  id: string;
  text: string;
  isCompleted: boolean;
}

interface InitialState {
  todoList: ITodo[];
  filterTodo: ITodo[];
}

const localStorageTodos = () => {
  if (typeof window !== "undefined") {
    let getTodos = localStorage.getItem("todos");
    let parsedTodos;
    if (getTodos) {
      parsedTodos = JSON.parse(getTodos);
    }
    return !Array.isArray(parsedTodos) ? [] : parsedTodos;
  } else {
    return [];
  }
};

const initialState: InitialState = {
  todoList: localStorageTodos(),
  filterTodo: localStorageTodos(),
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    createTodo: (state, action: PayloadAction<ITodo>) => {
      state.todoList.unshift(action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todoList));
      state.filterTodo = state.todoList;
    },

    deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.todoList.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.todoList.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(state.todoList));
        state.filterTodo = state.todoList;
      }
    },

    completeTodo: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.todoList.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.todoList[index].isCompleted = true;
        localStorage.setItem("todos", JSON.stringify(state.todoList));
        state.filterTodo = state.todoList;
      }
    },

    filterTodos: (state, action: PayloadAction<string>) => {
      if (action.payload === "completed") {
        state.filterTodo = state.todoList.filter((todo) => todo.isCompleted);
      } else if (action.payload === "pending") {
        state.filterTodo = state.todoList.filter((todo) => !todo.isCompleted);
      } else if (action.payload === "all") {
        state.filterTodo = state.todoList.filter((todo) => todo);
      }
    },

    searchTodos: (state, action: PayloadAction<{ text: string }>) => {
      state.filterTodo = state.todoList.filter((todo) =>
        todo.text.includes(action.payload.text)
      );
    },

    editTodo: (state, action: PayloadAction<ITodo>) => {
      const index = state.todoList.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.todoList[index].text = action.payload.text;
        localStorage.setItem("todos", JSON.stringify(state.todoList));
        state.filterTodo = state.todoList;
      }
    },
  },
});

export const {
  createTodo,
  deleteTodo,
  completeTodo,
  filterTodos,
  searchTodos,
  editTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
