import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authRequest, authSuccess, authFail } from "../reducers/authReducer";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const auth = useSelector((state) => state.auth);
  const { loading, error, userInfo } = auth;

  const dispatch = useDispatch();

  const register = async (e) => {
    e.preventDefault();
    dispatch(authRequest());

    if (password === confirmPassword) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post(
          "/api/auth/register",
          {
            name,
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

      <Form className="text-white" onSubmit={register}>
        <Form.Group className="form-group">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            name="name"
            value={name}
            type="text"
            placeholder="Name"
          />
        </Form.Group>

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

        <Form.Group className="form-group">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="passwordConfirmation"
            value={confirmPassword}
            type="password"
            placeholder="Password Confirmation"
          />
        </Form.Group>

        <Button disabled={loading} className="btn btn-primary" type="submit">
          Signup
        </Button>
      </Form>
      <h5 className="mt-2">
        Already have an account? <Link to="/login">Login</Link>
      </h5>
    </Container>
  );
};

export default RegisterScreen;
