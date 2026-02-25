import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../store/authSlice";
import { login } from "../api/auth.api";
import {
  Container,
  Col,
  Row,
  Alert,
  Button,
  Form,
  Card,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const Maps = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      dispatch(setCredentials(response.token));
      Maps("/");
    } catch {
      setError("invalid email or password");
    }
  }
  return (
    <Container style={{marginTop: "20vh"}}>
      <Row className="justify-content-center ">
        <Col md={5}>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="text-center mb-4">Sign in</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Group>
                {error && <Alert variant="danger">{error}</Alert>}
                <Button className="w-100" variant="primary" type="submit">
                  Sign in
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
