import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Form as BootstrapForm,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  FormText,
  Alert,Spinner
} from "react-bootstrap";
import { FormContainer } from "../../components/Layout";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../Redux/slices/auth";

const UserProfile=()=> {
    const { currentUser } = useSelector((state) => state.auth);
    const dispatch=useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const validationSchema = Yup.object({
        firstname: Yup.string().required("Name is required"),
        lastname: Yup.string().required("Last Name is required"),
        email: Yup.string()
          .email("Invalid email format")
          .required("Email is required"),
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
          .matches(/[a-z]/, "Password must contain at least one lowercase letter")
          .matches(/[0-9]/, "Password must contain at least one digit")
          .matches(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain at least one special character"
          )
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
      });
    
      useEffect(() => {
        return () => {
          setError(null);
          setSuccess(null);
        };
      }, []);
    
      const submitHandler = async (values) => {
        setLoading(true);
        setError(null);
        try {
          const result = await dispatch(updateProfile(values));
          if (!result.error) {
            setSuccess("Update user Profile successful!");
            setTimeout(() => setSuccess(null), 2000);
          }else{
            setError(result.payload.message || "update failed. Please try again.");
          }
        } catch (error) {
          console.log(error);
          setError("An unexpected error occurred. Please try again.");
        } finally {
          setLoading(false);
        }
      };
  return (
    <FormContainer>
      <h1>Update Profile</h1>
      {error && (
        <Alert variant="danger" className="my-3">
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" className="my-3">
          {success}
        </Alert>
      )}
      <Formik
        initialValues={{
          firstname:currentUser?.firstname|| "",
          lastname: currentUser?.lastname||"",
          email: currentUser?.email||"",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) =>{
            setLoading(true);
             submitHandler(values);
            }}
      >
        {({ handleSubmit, errors, touched ,dirty,isValid}) => (
          <BootstrapForm
            onSubmit={handleSubmit}
            onChange={() => {
              setError(null);
              setSuccess(null);
            }}
            disabled={loading ? true : false}
          >
            <FormGroup className="my-2" controlId="firstname">
              <FormLabel>Name</FormLabel>
              <Field name="firstname">
                {({ field }) => (
                  <FormControl
                    type="text"
                    placeholder="Name"
                    {...field}
                    isInvalid={touched.firstname && !!errors.firstname}
                    disabled={loading}
                  />
                )}
              </Field>
              <FormText className="text-danger">
                <ErrorMessage name="firstname" />
              </FormText>
            </FormGroup>

            <FormGroup className="my-2" controlId="lastname">
              <FormLabel>Last Name</FormLabel>
              <Field name="lastname">
                {({ field }) => (
                  <FormControl
                    type="text"
                    placeholder="Last Name"
                    {...field}
                    isInvalid={touched.lastname && !!errors.lastname}
                    disabled={loading}
                  />
                )}
              </Field>
              <FormText className="text-danger">
                <ErrorMessage name="lastname" />
              </FormText>
            </FormGroup>

            <FormGroup className="my-2" controlId="email">
              <FormLabel>Email</FormLabel>
              <Field name="email">
                {({ field }) => (
                  <FormControl
                    type="email"
                    placeholder="Email"
                    {...field}
                    isInvalid={touched.email && !!errors.email}
                    disabled={loading}
                  />
                )}
              </Field>
              <FormText className="text-danger">
                <ErrorMessage name="email" />
              </FormText>
            </FormGroup>

            <FormGroup className="my-2" controlId="password">
              <FormLabel>Password</FormLabel>
              <Field name="password">
                {({ field }) => (
                  <FormControl
                    type="password"
                    placeholder="Password"
                    {...field}
                    isInvalid={touched.password && !!errors.password}
                    disabled={loading}
                  />
                )}
              </Field>
              <FormText className="text-danger">
                <ErrorMessage name="password" />
              </FormText>
            </FormGroup>

            <FormGroup className="my-2" controlId="confirmPassword">
              <FormLabel>Confirm Password</FormLabel>
              <Field name="confirmPassword">
                {({ field }) => (
                  <FormControl
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                    isInvalid={
                      touched.confirmPassword && !!errors.confirmPassword
                    }
                    disabled={loading}
                  />
                )}
              </Field>
              <FormText className="text-danger">
                <ErrorMessage name="confirmPassword" />
              </FormText>
            </FormGroup>

            <Button
              type="submit"
              variant="primary"
              className="mt-3"
              disabled={loading || !dirty || !isValid}
            >
              {loading ? <Spinner animation="border" size="sm" />  : "Update Profile"}
            </Button>

            
          </BootstrapForm>
        )}
      </Formik>
    </FormContainer>
  )
}

export default UserProfile
