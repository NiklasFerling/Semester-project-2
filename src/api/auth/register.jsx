import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import login from "../../api/auth/login";

async function authRegister(email, password, name) {
  try {
    const response = await fetch("https://v2.api.noroff.dev/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: "An error occurred" };
  }
}

function RegisterForm() {
  const [registerErrors, setRegisterErrors] = useState([]);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  function onRegister(data) {
    authRegister(data.email, data.password, data.name).then((response) => {
      if (response.data) {
        setRegisterErrors(false);
        setRegisterSuccess(true);
      } else if (response.errors) {
        setRegisterSuccess(false);
        setRegisterErrors(response.errors[0].message);
      }
    });
  }

  const schema = yup
    .object({
      name: yup
        .string()
        .min(3, "Must be between 3-12 characters")
        .max(12, "Must be between 3-12 characters")
        .required("Name is required"),
      email: yup.string().email().required("Email is required"),
      password: yup
        .string()
        .min(8, "Must be at least 8 characters")
        .required("Password is required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(onRegister)}
      className="flex flex-col bg-neutral-700 p-5 rounded-md mt-20 mb-4"
    >
      <h2 className="text-xl mb-4">User deactivated?</h2>
      <p>Make a new one using name "Niklas"</p>
      <p className="text-red-500">{registerErrors && registerErrors}</p>
      <p className="text-green-500">
        {registerSuccess && "User created successfully"}
      </p>
      <label htmlFor="name">Name</label>
      <input
        {...register("name")}
        className="text-black px-2 py-1 rounded-md focus:outline-none"
      />
      <p className="text-red-400 mb-2">{errors.name?.message}</p>
      <label htmlFor="email">Email</label>
      <input
        {...register("email")}
        className="text-black px-2 py-1 rounded-md focus:outline-none"
      />
      <p className="text-red-400 mb-2">{errors.email?.message}</p>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        {...register("password")}
        className="text-black px-2 py-1 rounded-md focus:outline-none"
      />
      <p className="text-red-400 mb-2">{errors.password?.message}</p>
      <button type="submit">Register</button>
    </form>
  );
}
export default RegisterForm;
