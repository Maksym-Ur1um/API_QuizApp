import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import type { TestResultResponse } from "../types/test.types";

export default function TestResultPage() {
  const location = useLocation();
  const resultData = location.state as TestResultResponse;

  if (!resultData) {
    return (
      <div>
        <h1>No Result Found</h1>
        <Link to="/">Main Page</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{resultData.testTitle}</h1>
      <div>
        Your score: {resultData.correctAnswers} out of{" "}
        {resultData.totalQuestions}
      </div>
      <Link to="/">Main Page</Link>
    </div>
  );
}
