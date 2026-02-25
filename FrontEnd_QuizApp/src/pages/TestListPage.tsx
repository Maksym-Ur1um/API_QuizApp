import { useState } from "react";
import { useEffect } from "react";
import { getTests } from "../api/test.api";
import type { TestSummary } from "../types/test.types";
import { Link } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";

export default function TestListPage() {
  const [tests, setTests] = useState<TestSummary[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTests() {
      try {
        const response = await getTests();
        setTests(response);
      } catch {
        setError("Failed to load test list. Or no tests available");
      }
    }
    fetchTests();
  }, []);
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  return (
    <Container className="mt-5">
      <div>
        <Row xs={1} md={3} lg={5} className="g-4">
          {tests.map((test) => (
              <Col key={test.id}>
                <Card bg="primary" text="white" className="h-100 shadow-sm rounded-4">
                  <Card.Body className="flex-column">
                    <Card.Title className="mb-4">
                      {test.subjectName}
                    </Card.Title>
                    <Link to={`/test/${test.id}`} className="mt-auto w-100 btn btn-warning">Start</Link>
                  </Card.Body>
                </Card>
              </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}
