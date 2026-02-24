import { useParams } from "react-router-dom";

export default function TestResultPage() {
  const { id } = useParams<{ id: string }>();
  return <div>Test Result Page {id}</div>;
}
