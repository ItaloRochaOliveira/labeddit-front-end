import { useEffect, useState } from "react";
import { logo } from "../assents/img/exportImages";
import { goToHomePage, goToSignupPage } from "../routes/coordinator";
import { useNavigate } from "react-router-dom";
import { onChangeForm } from "../utils/onChangeForm";
import {
  requestDataUser,
  useRequestDataUser,
} from "../hooks/useRequestDataUser";
import { ToastContainer, toast } from "react-toastify";

export const LoginPage = () => {
  const navigate = useNavigate();

  const [loadingData, loading, error, setError, errorMessage] =
    useRequestDataUser();
  const [data, setData] = useState({});

  const [showPassword, setShowPassword] = useState("password");
  const [form, setForm] = useState({ email: "", password: "" });
  console.log(data);

  const registeringUser = async (e) => {
    e.preventDefault();

    setData(await loadingData("login", form));
  };

  error &&
    toast.error(errorMessage.response.data, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }) &&
    setError(false);

  useEffect(() => {
    if (data?.message) {
      localStorage.setItem("token", data.token);

      goToHomePage(navigate);
    }
  }, [data]);

  return (
    <div className="flex min-h-full flex-col justify-center mx-26 px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto w-21 h-21 " src={logo} alt="logo da labenu" />
        <h2 className=" mt-1 text-center text-xl/10 font-ibm font-bold leading-10 ">
          LabEddit
        </h2>
        <p className="mb-28 text-center text-4x1 font-ibm leading-5 ">
          O projeto de rede social da Labenu
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-4" type="submit">
          <div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="E-mail"
              value={form.email}
              onChange={(event) => {
                setForm(onChangeForm(event, form));
              }}
              required
              className="block w-full h-14 px-3 rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 "
            />
          </div>

          <div className="flex items-center  w-full h-14  rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 relative">
            <input
              id="password"
              name="password"
              type={showPassword}
              placeholder="Senha"
              value={form.password}
              onChange={(event) => setForm(onChangeForm(event, form))}
              required
              className="block w-full h-14 px-3 rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 "
            />

            <div>
              {showPassword === "password" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 absolute right-1 top-4"
                  onClick={() => setShowPassword("text")}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 absolute right-1 top-4"
                  onClick={() => setShowPassword("password")}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </div>
          </div>

          <div>
            {!loading ? (
              <button
                type="submit"
                className="flex w-full h-12 justify-center items-center rounded-full bg-gradient-to-r from-pink-400 to-orange-500 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400"
                onClick={(e) => registeringUser(e)}
              >
                Continuar
              </button>
            ) : (
              <button
                type="submit"
                className="flex w-full h-12 justify-center items-center rounded-full bg-gradient-to-r from-pink-400 to-orange-500 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400"
                disabled
              >
                <div className="h-8 w-8 border-4 border-1-gray-200 border-r-gray-200 border-b-gray-200 border-t-orange-500 animate-spin ease-linear rounded-full" />
              </button>
            )}
          </div>
          <hr />
          <div>
            <button
              onClick={() => goToSignupPage(navigate)}
              className="flex w-full h-12 justify-center items-center bg-white px-3 py-1.5 text-lg font-semibold leading-6 border rounded-full text-orange-500 border-orange-500 border-solid shadow-sm hover:bg-orange-500 hover:text-white transition duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              Crie uma conta!
            </button>
          </div>
        </form>

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
};
