import React, { useState } from "react";
import { Form, Container, Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authRequest, authSuccess, authFail } from "../reducers/authReducer";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useSelector((state) => state.auth);
  const { loading, error, userInfo } = auth;

  const dispatch = useDispatch();

  const login = async (e) => {
    e.preventDefault();
    dispatch(authRequest());

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/auth/login",
        {
          email,
          password,
        },
        config
      );
      dispatch(authSuccess(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch(authFail(error.response.data.error));
    }
  };

  if (userInfo) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="mt-4">
      {error && (
        <Alert className="mt-3" variant="danger">
          {error}
        </Alert>
      )}

      <Form className="text-white" onSubmit={login}>
        <Form.Group className="form-group">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            value={email}
            placeholder="Email"
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button disabled={loading} className="btn btn-primary" type="submit">
          Login
        </Button>
      </Form>
      <h5 className="mt-2">
        Don't have an account? <Link to="/signup">Signup</Link>
      </h5>
    </Container>
  );
};

export default LoginScreen;
