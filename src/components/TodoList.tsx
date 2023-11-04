import { Button, Input, Flex, Checkbox, Heading } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { Store } from "../store/types";
import { deleteTodo, toggleTodo, updateTodo } from "../store/actions";

function TodoListItems() {
  const todos = useSelector((state: Store) => state.todos);
  const dispatch = useDispatch();

  return (
    <>
      {todos.map((todo: { id: number; text: string }) => (
        <Flex pt={2} key={todo.id}>
          <Checkbox onClick={() => dispatch(toggleTodo(todo.id))} />
          <Input
            mx={2}
            value={todo.text}
            onChange={(event: { target: { value: string } }) =>
              dispatch(updateTodo(todo.id, event.target.value))
            }
          />
          <Button
            colorScheme="blue"
            mx={2}
            onClick={() => dispatch(updateTodo(todo.id, todo.text))}
          >
            Update
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => dispatch(deleteTodo(todo.id))}
          >
            Delete
          </Button>
        </Flex>
      ))}
    </>
  );
}

function TodoList() {
  return (
    <>
      <Heading>Todo List</Heading>
      <TodoListItems />
    </>
  );
}

export default TodoList;
