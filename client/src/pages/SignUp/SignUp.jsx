import { useState } from 'react';
import { Link } from "react-router-dom";
import { FormContainer } from "../../components/Layout";
import { Form, Button, Row, Col } from "react-bootstrap";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <FormContainer>
      <h1>sign Up page</h1>
      <Form onSubmit={submitHandler}>
      <Form.Group className="my-2" controlId="firstname">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="lastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
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
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">Sign Up</Button>
        <Row className="py-3">
          <Col>
            Already have an Account? <Link to={'/signin'}> Sign In</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default SignUp
