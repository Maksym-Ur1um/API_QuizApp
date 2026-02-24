import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ActiveTestPage from "./pages/ActiveTestPage";
import TestListPage from "./pages/TestListPage";
import TestResultPage from "./pages/TestResultPage";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <TestListPage />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/test/:id"
          element={
            <ProtectedRoute>
              <ActiveTestPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="results/:id"
          element={
            <ProtectedRoute>
              <TestResultPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
