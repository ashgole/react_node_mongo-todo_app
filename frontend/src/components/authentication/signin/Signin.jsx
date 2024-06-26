import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../../../utils/token";
import { postData } from "../../../utils/api";
import { SIGNIN } from "../../../utils/constants";
import {
  addUserAuth,
  setAuthentication,
} from "../../../features/auth/signinSlice";
import Button from "../../button/Button";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const todos = useSelector(state => state.todos)

  const [userCred, setUserCred] = useState({
    email: "ashish@gmail.com",
    password: "12345",
  });

  const signinCred = (e) => {
    const { name, value } = e.target;
    setUserCred({ ...userCred, [name]: value });
  };

  const signinHandler = async (e) => {
    e.preventDefault();
    let response = await postData(SIGNIN, userCred);
    if (response.statusCode === 200) {
      setToken("refreshToken", response.data.refreshToken);
      setToken("accessToken", response.data.accessToken);
      const userDetails = {
        username: response.data.user.username,
        email: response.data.user.email,
      };
      dispatch(addUserAuth(userDetails));
      dispatch(setAuthentication(true));
      navigate("/home");
    }
  };

  return (
    <>
      <section>
        <div className="flex flex-col items-center justify-center mx-auto mt-4 p-4">
          <div className="flex items-center mb-6 text-2xl font-semibold">
            Signin
          </div>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create and account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    value={"ashishgole@gmail.com"}
                    name="email"
                    onChange={signinCred}
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
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
                    value={"12345"}
                    name="password"
                    onChange={signinCred}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <Button label={"Signin"} handler={signinHandler} />
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    to={"/signup"}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Create Account
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
