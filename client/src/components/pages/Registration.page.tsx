import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Hooks
import useAuthContext from "../../hooks/useAuthContext.hook";

// Types
import { TNewUser } from "../../app/types/User.type";

// Assets
import logo from "../../../public/pelmorex_logo.png";
import { Link } from "react-router-dom";

type TFormValues = {
    username: string
    email: string
    confirmEmail: string
    password: string
    confirmPassword: string
}

export default function Registration() {
  const { authSighUp } = useAuthContext();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("User Name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    confirmEmail: Yup.string()
        .oneOf([Yup.ref('email'), undefined], 'Emails must match')
        .required('Confirm Email is required'),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
        .required('Confirm Password is required'),
  });

  const { register, handleSubmit, formState } = useForm<TFormValues>({ resolver: yupResolver(validationSchema) });
  const { errors } = formState;

  const sighUpHandler: SubmitHandler<TFormValues> = async (data) => {
    const newUser: TNewUser = {
        username: data.username,
        email: data.email,
        password: data.password,
        status: "free"
    }

    authSighUp(newUser);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <img alt="Your Company" src={logo} className="mx-auto h-20 w-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create a new account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(sighUpHandler)} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              User Name
            </label>
            <div className="mt-2">
              <input
                id="username"
                {...register("username")}
                className="block w-full rounded-md border-0 px-3 py-1.5 sm:px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div className="text-sm text-red-600">{errors.username?.message}</div>
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                {...register("email")}
                className="block w-full rounded-md border-0 px-3 py-1.5 sm:px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div className="text-sm text-red-600">{errors.email?.message}</div>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmEmail"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm Email address
            </label>
            <div className="mt-2">
              <input
                id="confirmEmail"
                {...register("confirmEmail")}
                className="block w-full rounded-md border-0 px-3 py-1.5 sm:px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div className="text-sm text-red-600">{errors.confirmEmail?.message}</div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                {...register("password")}
                className="block w-full rounded-md border-0 px-3 py-1.5 sm:px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div className="text-sm text-red-600">{errors.password?.message}</div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirmPassword"
                {...register("confirmPassword")}
                className="block w-full rounded-md border-0 px-3 py-1.5 sm:px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div className="text-sm text-red-600">{errors.confirmPassword?.message}</div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
                to="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
                Login!
            </Link>
            </p>
        </form>
      </div>
    </div>
  );
}
