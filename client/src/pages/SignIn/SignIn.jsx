import { useState } from "react";
import { Link } from "react-router-dom";
import { FormContainer } from "../../components/Layout";
import { Form, Button, Row, Col } from "react-bootstrap";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <FormContainer>
      <h1>sign in page</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">Sign In</Button>
        <Row className="py-3">
          <Col>
            Don't have an Account? <Link to={'/signup'}> Sign Up</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default SignIn;
