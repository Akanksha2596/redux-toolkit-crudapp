import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import TodoList from "./components/TodoList";
import TodoAdd from "./components/TodoAdd";
import store from "./store/store";
import TopBar from "./components/TopBar";

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Box maxWidth="8xl" margin="auto" p={5}>
          <TopBar />
          <TodoAdd />
          <TodoList />
        </Box>
      </Provider>
    </ChakraProvider>
  );
}
