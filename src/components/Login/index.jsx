import { Link } from "react-router-dom";
import RegisterForm from "../../api/auth/register";
import LoginForm from "../../api/auth/login";

function Login() {
  return (
    <div className="text-white w-80 m-auto min-h-screen ">
      <Link to="/">
        <h1 className="text-center text-4xl">Devpedia</h1>
      </Link>
      <LoginForm />
      <RegisterForm />
      <Link to="/">
        <i className=" fas fa-arrow-left mr-2"></i>
        back to home page
      </Link>
    </div>
  );
}
export default Login;
