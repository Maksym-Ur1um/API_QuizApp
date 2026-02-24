import { useParams } from "react-router-dom";

export default function ActiveTestPage() {
  const { id } = useParams<{id: string}>();
  return <div>Active Test Page {id}</div>;
}
