import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import save from "../../storage/save";

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
    save("accessToken", data.data.accessToken);
    return data;
  } catch (error) {
    console.log(error);
    return { error: "An error occurred" };
  }
}

function LoginForm() {
  const { setIsLoggedIn } = useContext(AuthContext);
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
    login(data.email, data.password);
    setIsLoggedIn(true);
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onLogin)}
      className="flex flex-col bg-neutral-700 p-5 rounded-md mt-20 mb-4"
    >
      <h2 className="text-xl mb-4">Login</h2>
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
      <button type="submit">Login</button>
    </form>
  );
}
export default LoginForm;
