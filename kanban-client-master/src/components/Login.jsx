import React, { useState } from "react";
import PrimaryBtn from "./PrimaryBtn";
import { useNavigate } from "react-router-dom";
import { signIn } from "../utils/request";

const Login = () => {
  const [form, setForm] = useState({
    phone: "",
    password: "",
    loading: false,
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async e => {
    e.preventDefault();
    const { phone, password } = form;
    if (phone && password) {
      setForm({
        ...form,
        loading: true,
      });
      try {
        const response = await signIn(phone, password);
        if (response.status === 200) {
          window.localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        alert("Login yoki parol xato!");
      }

      setForm({
        ...form,
        loading: false,
      });
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Kanban
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Log in
            </h1>
            <form
              onSubmit={submitForm}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="998905338633"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  id="password"
                  placeholder=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <PrimaryBtn
                bg={"var(--primary-color)"}
                color={"#fff"}
                padding={"10px 0"}
              >
                Login
              </PrimaryBtn>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="https://t.me/yousuf_dev"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Contact
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
