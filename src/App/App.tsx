import React, { useRef } from "react";

import { connect } from "react-redux";
import { deleteTodo, markComplete, markIncomplete } from "action/index";
import storeType from "types/storeType";
import AppPropType from "./AppPropType";

import {
  Button,
  Container,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const App: React.FC<AppPropType> = ({
  complete,
  incomplete,
  deleteTodo,
  markComplete,
  markIncomplete,
}) => {
  const input = useRef<HTMLInputElement>(null);

  const renderList = (type: "Complete" | "Incomplete") => {
    const looper = type === "Complete" ? complete : incomplete;
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <List sx={{ width: "1000px" }}>
          <Typography
            sx={{ fontSize: "24px", fontWeight: "bold", color: "#555555" }}
          >
            {type}
          </Typography>
          {looper.map((todo, index) => {
            return (
              <ListItem
                key={index}
                sx={{
                  backgroundColor: "#D0E8F2",
                  padding: "20px",
                  borderRadius: "5px",
                  marginBottom: "10px",
                }}
                //   variant={type === "Complete" ? "success" : "danger"}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography sx={{ color: "#555555" }}>{todo}</Typography>
                <div>
                  <i
                    style={{ marginRight: "6px" }}
                    className={`fas fa-${
                      type === "Complete" ? "minus" : "check"
                    } m-2`}
                    onClick={() => {
                      type === "Complete"
                        ? markIncomplete(todo)
                        : markComplete(todo);
                    }}
                  ></i>
                  <i
                    className="fas fa-trash m-2"
                    onClick={() => deleteTodo(todo)}
                  ></i>
                </div>
              </ListItem>
            );
          })}
        </List>
      </Box>
    );
  };

  const addTodo = () => {
    if (input.current) {
      const val = input.current.value;
      input.current.value = "";
      markIncomplete(val);
    }
  };

  return (
    <Container
      sx={{ backgroundColor: "#F4F3F3", padding: "60px", borderRadius: "5px" }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "10px",
          color: "#555555",
        }}
      >
        TODO LIST
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          id="outlined-basic"
          placeholder="add ur task"
          variant="outlined"
          sx={{
            maxWidth: "800px",
            width: "100%",
            height: "70px",
            marginRight: "25px",
          }}
          inputRef={input}
        />
        <Button
          sx={{ height: "55px", maxWidth: "200px", width: "100%" }}
          variant="outlined"
          onClick={() => addTodo()}
        >
          <i style={{ marginRight: "6px" }} className="fas fa-plus"></i>
          Add
        </Button>
      </Box>
      {renderList("Incomplete")}
      {renderList("Complete")}
    </Container>
  );
};

const mapStateToProps = (state: storeType) => {
  return {
    complete: state.complete,
    incomplete: state.incomplete,
  };
};

export default connect(mapStateToProps, {
  deleteTodo,
  markComplete,
  markIncomplete,
})(App);
