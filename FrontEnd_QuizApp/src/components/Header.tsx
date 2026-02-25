import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import type { RootState } from "../store/store";
import { Link } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

export default function Header() {
  const isLogged = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const dispatch = useDispatch();
  const Maps = useNavigate();

  function handleLogout() {
    dispatch(logout());
    Maps("/login");
  }

  const location = useLocation();
  if (location.pathname === "/login") return null;

  return (
    <Navbar className="bg-primary">
      <Container>
          <Nav className="ms-auto">
            {isLogged ? (
              <Button variant="danger" onClick={handleLogout}>Logout</Button>
            ) : (
              <Nav.Link as={Link} to="/login">Sign in</Nav.Link>
            )}
          </Nav>
      </Container>
    </Navbar>
  );
}
