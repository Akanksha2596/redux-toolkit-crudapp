import React from "react";
import { Grid, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { getTodos } from "../store/actions";

function TopBar() {
  const dispatch = useDispatch();
  console.log(
    "https://raw.githubusercontent.com/jherr/todos-four-ways/master/data/todos.json"
  );

  return (
    <Grid pt={2} templateColumns="1fr 1fr" columnGap="3">
      <Button
        colorScheme="blue"
        onClick={() =>
          dispatch(
            getTodos(
              "https://raw.githubusercontent.com/jherr/todos-four-ways/master/data/todos.json"
            )
          )
        }
      >
        Load
      </Button>
    </Grid>
  );
}

export default TopBar;
