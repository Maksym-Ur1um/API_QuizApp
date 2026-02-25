import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import type { TestResultResponse } from "../types/test.types";
import { Container, Row, Col, Card, Alert, ProgressBar } from "react-bootstrap";

export default function TestResultPage() {
  const location = useLocation();
  const resultData = location.state as TestResultResponse;

  if (!resultData) {
    return (
      <Container className="mt-5">
        <div>
          <Alert variant="warning" className="text-center">
            No Result Found
          </Alert>
          <Link to="/" className="btn text-center btn-dark mt-3">
            Main Page
          </Link>
        </div>
      </Container>
    );
  }

  const resultPersentage = Math.round(
    (resultData.correctAnswers / resultData.totalQuestions) * 100,
  );

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card className="text-center shadow-sm">
            <Card.Title className="mb-4">{resultData.testTitle}</Card.Title>
            <Card.Body>
              <h2 className="display-4 text-primary">
                Your score: {resultData.correctAnswers} out of{" "}
                {resultData.totalQuestions}
              </h2>
              <ProgressBar
                now={resultPersentage}
                label={`${resultPersentage}%`}
                variant="success"
                striped
                animated
                className="mb-4"
              />
            </Card.Body>
          </Card>
          <Link to="/" className="btn btn-outline-primary btn-lg mt-4">
            Main Page
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
