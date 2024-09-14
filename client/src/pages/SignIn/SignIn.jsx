import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FormContainer } from "../../components/Layout";
import { Form, Button, Row, Col,Spinner  } from "react-bootstrap";

import { signIn } from "../../Redux/slices/auth";
const SignIn = () => {

  const [credentials, setCredentials] = useState({email: "", password: ""});
  const [loading,setLoading]=useState(false)
  const [isTouched,setIsTouched]=useState(false)
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

const changeHandler=(e)=>{
  e.preventDefault();
  setCredentials({ ...credentials, [e.target.name]: e.target.value });
  setIsTouched(true)
  if (validationError) {
    setValidationError("");
  }
}
  const submitHandler = async (e) => {
    e.preventDefault();
    if(!credentials.email || !credentials.password){
      setValidationError("Please fill in all fields");
      return;
    }
    setLoading(true); 
    try {
      const result = await dispatch(signIn(credentials));
      setLoading(false);
      if (!result.error) {
        navigate("/");
      }else{
        setValidationError(result.payload.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setValidationError("An unexpected error occurred. Please try again.");
    }
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
            onChange={changeHandler}
            name="email"
            value={credentials.email}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={changeHandler}
            name="password"
            value={credentials.password}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3" disabled={loading || !isTouched || !credentials.email || !credentials.password }>
        {loading ? <Spinner animation="border" size="sm" /> : "Sign In"}
        </Button>
        <Row className="py-3">
          <Col>
            Don't have an Account? <Link to={"/signup"}> Sign Up</Link>
          </Col>
        </Row>
      </Form>
      { validationError && <h5>{validationError}</h5>}
    </FormContainer>
  );
};

export default SignIn;
