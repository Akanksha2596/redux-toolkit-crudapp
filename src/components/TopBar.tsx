import { Grid, Button } from "@chakra-ui/react";
import { useAppDispatch, load } from "../store";

function TopBar() {
  const dispatch = useAppDispatch();
  const onLoad = () => {
    dispatch(
      load(
        "https://raw.githubusercontent.com/jherr/todos-four-ways/master/data/todos.json"
      )
    );
  };
  return (
    <Grid pt={2} templateColumns="1fr 1fr" columnGap="3">
      <Button colorScheme="blue" onClick={onLoad}>
        Load
      </Button>
    </Grid>
  );
}

export default TopBar;
