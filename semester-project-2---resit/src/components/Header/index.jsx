import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex flex-row-reverse px-20 py-5">
      <i className="fas fa-user text-white text-xl ml-4"></i>
      <Link to="/login" className="text-white">
        Log In
      </Link>
    </header>
  );
}
export default Header;
