import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const Hero = () => {
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card w-75">
          <Card.Body>
            <Card.Title as="h2">Mern Authentication</Card.Title>
            <Card.Text className="text-center mb-4">
              This is a biolerplate for MERN Authentication that stores a JwT in
              an HTTP-Only cokie. it also uses Redux Toolkit and React Bootstrap
              library
            </Card.Text>
          </Card.Body>
          <div className="d-flex">
            <LinkContainer to="/signin">
              <Button variant="primary" className="me-3">
                Sign In
              </Button>
            </LinkContainer>
            <LinkContainer to="/signup">
              <Button variant="secondary" className="me-3">
                Sign Up
              </Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
