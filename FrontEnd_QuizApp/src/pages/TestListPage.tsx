import { useState } from "react";
import { useEffect } from "react";
import { getTests } from "../api/test.api";
import type { TestSummary } from "../types/test.types";
import { Link } from "react-router-dom";

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
    <div>
      {tests.map((test) => (
        <div key={test.id}>
          <div>{test.subjectName}</div>
          <Link to={`/test/${test.id}`}>Start</Link>
        </div>
      ))}
    </div>
  );
}
