import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getTestById } from "../api/test.api";
import type { TestDetail } from "../types/test.types";
import { useNavigate } from "react-router-dom";
import { submitTest } from "../api/test.api";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  Form,
  Alert,
} from "react-bootstrap";

export default function ActiveTestPage() {
  const { id } = useParams<{ id: string }>();
  const [testData, setTestData] = useState<TestDetail | null>(null);
  const [error, setError] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [validationError, setValidationError] = useState("");
  const Maps = useNavigate();

  function handleAnswerSelect(questionId: number, answerId: number) {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  }

  async function handleSubmitTest() {
    setValidationError("");
    if (!testData) return;
    if (Object.keys(selectedAnswers).length < testData.questions.length) {
      setValidationError("Please answer all questions");
      return;
    }
    const submittedAnswers = Object.entries(selectedAnswers);
    const formattedAnswers = submittedAnswers.map((submittedAnswer) => {
      return {
        questionId: Number(submittedAnswer[0]),
        selectedAnswerId: submittedAnswer[1],
      };
    });
    const requestData = {
      testId: Number(id),
      answers: formattedAnswers,
    };
    try {
      const responseData = await submitTest(requestData);
      Maps(`/results/${id}`, { state: responseData });
    } catch {
      setError("Failed to submit test");
    }
  }

  useEffect(() => {
    async function fetchTest() {
      try {
        const response = await getTestById(Number(id));
        setTestData(response);
      } catch {
        setError("Failed to load test");
      }
    }
    fetchTest();
  }, [id]);
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (testData === null) return <div>Loading test...</div>;

  return (
    <div className="bg-light min-vh-100 py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="mb-4 shadow-sm border-0 border-top border-primary border-5">
              <Card.Body>
                <h1>{testData.title}</h1>
              </Card.Body>
            </Card>
            {testData.questions.map((question) => (
              <Card key={question.id} className="mb-4 shadow-sm border-0">
                <Card.Body>
                  <Card.Title>{question.questionText}</Card.Title>
                  {question.answers.map((answer) => (
                    <Form.Check
                      type="radio"
                      name={String(question.id)}
                      label={answer.answerText}
                      id={`question-${question.id}-answer-${answer.id}`}
                      checked={selectedAnswers[question.id] === answer.id}
                      onChange={() =>
                        handleAnswerSelect(question.id, answer.id)
                      }
                      className="mb-2"
                    ></Form.Check>
                  ))}
                </Card.Body>
              </Card>
            ))}
            <Button
              variant="success"
              size="lg"
              onClick={handleSubmitTest}
              className="w-100 mt-4"
            >
              Finish Test
            </Button>
            {validationError && (
              <Alert variant="danger">{validationError}</Alert>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
