import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  PayloadAction,
  configureStore,
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";

//Creating Standard interface and functions
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

const addTodoToList = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    done: false,
  },
];

const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

//Implementing redux toolkit
interface State {
  todos: Todo[];
  newTodo: string;
}
const initialState: State = {
  todos: [],
  newTodo: "",
};

export const addTodo = createAction("addTodo");
export const setNewTodo = createAction<string>("setNewTodo");
export const update = createAction<{ id: number; text: string }>("update");
export const toggle = createAction<number>("toggle");
export const remove = createAction<number>("remove");

// Async call using thunk
export const load = createAsyncThunk("load", async (url: string) => {
  const response = await fetch(url);
  console.log(response);
  return await response.json();
});
// createSlice function provides a builder callback that allows you to define reducers and actions in a more concise and intuitive way. The builder callback simplifies the process of creating Redux actions and reducers by automatically generating action creators and ensuring that you work with mutable updates to the state.
// createReducer takes an initial state and a callback function that defines how to handle different action types. It uses a "builder" pattern where you can use addCase to specify how each action should modify the state.
// PayloadAction is a type in Redux Toolkit that ensures type safety for action creators. It allows you to specify the payload type an action carries, helping catch errors at compile time when you dispatch actions with the wrong payload type or access the payload incorrectly in reducers.
const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(load.fulfilled, (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    })
    .addCase(setNewTodo, (state, action) => {
      state.newTodo = action.payload;
    })
    .addCase(addTodo, (state) => {
      state.todos = addTodoToList(state.todos, state.newTodo);
      state.newTodo = "";
    })
    .addCase(update, (state, action) => {
      state.todos = updateTodo(
        state.todos,
        action.payload.id,
        action.payload.text
      );
    })
    .addCase(remove, (state, action) => {
      state.todos = removeTodo(state.todos, action.payload);
    })
    .addCase(toggle, (state, action) => {
      state.todos = toggleTodo(state.todos, action.payload);
    });
});
const store = configureStore({
  reducer,
  devTools: true,
});
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
export default store;
