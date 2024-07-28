import { Link } from "react-router-dom";
import {Context as context} from "../shared/context"
const logout = (e:any) => {
  e.preventDefault();
  sessionStorage.removeItem("logged");
  window.location.href="/";
}
export function NavBar() {
  const auth = context();
  return (
    <header className="header">
      <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
        <Link className="d-flex align-items-center link-body-emphasis logo text-decoration-none" to="/">
          Hack Attack <div className="title">Bank of APIs Summer Hackthon</div>
        </Link>
        <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
          <div className="me-3 py-2 link-body-emphasis text-decoration-none">Welcome <span className="font-b">{auth.state.name}</span></div>
          <Link className="me-3 py-2 link-body-emphasis text-decoration-none" to="/home">Home</Link>
          <Link className="me-3 py-2 link-body-emphasis text-decoration-none" to="/" onClick={logout}>Logout</Link>
        </nav>
      </div>
    </header>
  );
}
