import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/authContext";

import { Link } from "react-router-dom";
import load from "../../storage/load";
import logout from "../../api/auth/logout";

function Header() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  function onLogout() {
    logout();
    setIsLoggedIn(false);
  }

  useEffect(() => {
    const token = load("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [load, setIsLoggedIn]);

  return (
    <header className="flex flex-row-reverse px-20 py-5">
      {isLoggedIn ? (
        <>
          <button onClick={onLogout} className="text-white">
            Logout
          </button>
          <Link to="/new-post" className="flex mr-5">
            <i className="fas fa-plus text-white mr-2"></i>
            <p className="text-white">New post</p>
          </Link>
        </>
      ) : (
        <Link to="/login" className="text-white">
          Login
        </Link>
      )}
    </header>
  );
}
export default Header;
