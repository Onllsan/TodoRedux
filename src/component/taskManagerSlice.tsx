import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TodoItem {
  task: string;
  id: string;
  completed: boolean;
}

interface TodoState {
  todoList: TodoItem[];
  sortCriteria: string;
}

const initialState: TodoState = {
  todoList: [],
  sortCriteria: "All",
};

const taskManagerSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodoList: (state, action: PayloadAction<TodoItem[]>) => {
      state.todoList = action.payload;
    },
    addTodo: (state, action: PayloadAction<{ task: string; id: string }>) => {
      state.todoList.push({
        task: action.payload.task,
        id: action.payload.id,
        completed: false,
      });
    },
    sortTodo: (state, action: PayloadAction<string>) => {
      state.sortCriteria = action.payload;
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: string; task: string }>
    ) => {
      const { id, task } = action.payload;
      const index = state.todoList.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        state.todoList[index].task = task;
      }
    },
    toggleCompleted: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const index = state.todoList.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        state.todoList[index].completed = !state.todoList[index].completed;
      }
    },
  },
});

export const { setTodoList, addTodo, sortTodo, updateTodo, toggleCompleted } =
  taskManagerSlice.actions;

export default taskManagerSlice.reducer;
