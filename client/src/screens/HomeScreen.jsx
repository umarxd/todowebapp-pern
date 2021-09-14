import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { logout } from "../reducers/authReducer";

const HomeScreen = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [change, setChange] = useState(false);

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;

  const config = {
    headers: {
      jwt_token: userInfo.jwtToken,
      "Content-Type": "application/json",
    },
  };

  const getTodos = async () => {
    try {
      const { data } = await axios.get("/api/todos/", config);
      setTodos(data);
    } catch (error) {}
  };

  useEffect(() => {
    getTodos();
  }, [change]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (todo) {
      const { data } = await axios.post(
        "/api/todos/create",
        {
          description: todo,
        },
        config
      );
      setChange((change) => !change);
      setTodo("");
    }
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/api/todos/delete/${id}`, config);
    setChange((change) => !change);
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    dispatch(logout());
  };

  return (
    <>
      <button className="logoutBtn " onClick={() => logoutHandler()}>
        Logout
      </button>
      <h5 className="topText">Welcome {userInfo.user_name}</h5>

      <div className="mainContainer mb-5 text-center">
        {todos.map((todo) => (
          <div className="todoCard bg-primary">
            <p>{todo.description}</p>

            <Button
              style={{ fontSize: ".8rem" }}
              className="btn-sm"
              onClick={() => deleteTodo(todo.todo_id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
      <Form className="w-50 m-auto  " onSubmit={handleSubmit}>
        <Form.Group controlId="text">
          <Form.Label className="text-white">Enter Todo</Form.Label>
          <Form.Control
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            type="text"
            placeholder="Enter Todo"
          />
        </Form.Group>
        <Button
          style={{ fontSize: ".7rem" }}
          className="submitBtn"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default HomeScreen;
