import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import login from "../../api/auth/login";

function Login() {
  const schema = yup
    .object({
      userName: yup.string().required("Email is required"),
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

  const onSubmit = (data) => {
    login(data.userName, data.password);
    console.log(data);
  };
  return (
    <div className="text-white w-80 m-auto min-h-screen ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bg-neutral-700 p-5 rounded-md mt-20 mb-4"
      >
        <h1 className="text-xl mb-4">Login</h1>
        <label htmlFor="userName" className="mt-2">
          Email
        </label>
        <input
          {...register("userName")}
          className="text-black px-2 py-1 rounded-md focus:outline-none"
        />
        <p className="text-red-400">{errors.userName?.message}</p>
        <label htmlFor="password" className="mt-2">
          Password
        </label>
        <input
          {...register("password")}
          className="text-black px-2 py-1 rounded-md focus:outline-none"
        />
        <p className="text-red-400">{errors.password?.message}</p>
        <button type="submit">Login</button>
      </form>
      <Link to="/">
        <i className=" fas fa-arrow-left mr-2"></i>
        back to home page
      </Link>
    </div>
  );
}
export default Login;
