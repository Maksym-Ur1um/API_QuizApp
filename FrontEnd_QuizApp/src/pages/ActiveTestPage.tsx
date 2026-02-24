import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getTestById } from "../api/test.api";
import type { TestDetail } from "../types/test.types";
import { useNavigate } from "react-router-dom";
import { submitTest } from "../api/test.api";

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
    if(!testData) return;
    if(Object.keys(selectedAnswers).length < testData.questions.length) {
      setValidationError("Please answer all questions");
      return;
    }
    const submittedAnswers = Object.entries(selectedAnswers);
    const formattedAnswers = submittedAnswers.map((submittedAnswer) => {
      return {
        questionId: Number(submittedAnswer[0]),
        selectedAnswerId: submittedAnswer[1]
      }
    })
    const requestData = {
      testId: Number(id),
      answers: formattedAnswers
    }
    try {
      const responseData = await submitTest(requestData)
      Maps(`/results/${id}`, {state: responseData})
    } catch {
      setError("Failed to submit test")
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
    <div>
      <h1>{testData.title}</h1>
      {testData.questions.map((question) => (
        <div key={question.id}>
          <div>{question.questionText}</div>
          {question.answers.map((answer) => (
            <div key={answer.id}>
              <label>
                <input
                  type="radio"
                  name={String(question.id)}
                  checked={selectedAnswers[question.id] === answer.id}
                  onChange={() => handleAnswerSelect(question.id, answer.id)}
                />
                {answer.answerText}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmitTest}>Finish Test</button>
      {validationError && <div style={{ color: "red" }}>{validationError}</div>}
    </div>
  );
}
