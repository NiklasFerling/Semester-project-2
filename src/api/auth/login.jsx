import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import save from "../../storage/save";
import load from "../../storage/load";

const accessToken = load("accessToken");

function LoginForm() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [loginErrors, setLoginErrors] = useState([]);

  async function login(email, password) {
    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);

      if (data.data) {
        save("accessToken", data.data.accessToken);
      } else if (!data.ok) {
        setLoginErrors(data.errors[0].message);
        console.log(loginErrors);
      }

      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  const schema = yup
    .object({
      email: yup.string().email().required("Email is required"),
      password: yup.string().required("Password is required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onLogin = (data) => {
    login(data.email, data.password).then((response) => {
      console.log(response);
      if (response.data) {
        setIsLoggedIn(true);
        window.location.href = "/";
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onLogin)}
      className="flex flex-col bg-neutral-700 p-5 rounded-md mt-20 mb-4"
    >
      <h2 className="text-xl mb-4">Login</h2>
      <p className="text-red-400 mb-2">{loginErrors ? loginErrors : null}</p>
      <label htmlFor="email" className="mt-2">
        Email
      </label>
      <input
        {...register("email")}
        className="text-black px-2 py-1 rounded-md focus:outline-none"
      />
      <p className="text-red-400">{errors.email?.message}</p>
      <label htmlFor="password" className="mt-2">
        Password
      </label>
      <input
        type="password"
        {...register("password")}
        className="text-black px-2 py-1 rounded-md focus:outline-none"
      />
      <p className="text-red-400 mb-2">{errors.password?.message}</p>
      <button type="submit" onSubmit={handleSubmit(onLogin)}>
        Login
      </button>
    </form>
  );
}
export default LoginForm;
