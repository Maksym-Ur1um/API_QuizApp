import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import type { RootState } from "../store/store";
import { Link } from "react-router-dom";

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

  return (
    <header>
      {isLogged ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/login">Sign in</Link>
      )}
    </header>
  );
}
