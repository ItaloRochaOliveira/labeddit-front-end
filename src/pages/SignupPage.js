import { useEffect, useState } from "react";
import { logo } from "../assents/img/exportImages";
import { goToHomePage, goToLoginPage } from "../routes/coordinator";
import { useNavigate } from "react-router-dom";
import { onChangeForm } from "../utils/onChangeForm";
import { useRequestDataUser } from "../hooks/useRequestDataUser";
import { ToastContainer, toast } from "react-toastify";

export const SignupPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [loadingData, loading, error, setError, errorMessage] =
    useRequestDataUser();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState("password");

  const registeringUser = async (e) => {
    e.preventDefault();

    setData(await loadingData("signup", form));
  };

  error &&
    toast.error(
      errorMessage.response.data[0].message || errorMessage.response.data,
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    ) &&
    setError(false);

  useEffect(() => {
    if (data?.token) {
      localStorage.setItem("token", data.token);

      goToHomePage(navigate);
    }
  }, [data]);

  return (
    <div className="flex min-h-full flex-col justify-center ">
      <div className="mb-48 sm:mb-24">
        <div className="flex justify-between items-center bg-slate-200 h-12 mb-7 ">
          <div className="basis-1/4"></div>
          <div className="basis-1/2">
            <img className="mx-auto w-7 h-7 " src={logo} alt="logo da labenu" />
          </div>
          <div className="flex justify-end basis-1/4 text-blue-500 hover:text-blue-300">
            <button className="mr-5" onClick={() => goToLoginPage(navigate)}>
              Entrar
            </button>
          </div>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm mx-26 px-6">
          <h2 className=" mt-1 text-center text-xl/10 font-ibm font-bold leading-10 ">
            Olá, boas vindas ao LabEddit ;)
          </h2>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm mx-26 px-6">
        <form className="space-y-6 mb-10" type="submit">
          <div className="flex items-center ">
            <input
              id="name"
              name="name"
              type="name"
              value={form.name}
              onChange={(e) => setForm(onChangeForm(e, form))}
              placeholder="Apelido"
              required
              className="block w-full h-14 px-3 rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="E-mail"
              value={form.email}
              onChange={(e) => setForm(onChangeForm(e, form))}
              required
              className="block w-full h-14 px-3 rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="w-full h-14 rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 relative">
            <input
              id="password"
              name="password"
              type={showPassword}
              placeholder="Senha"
              value={form.password}
              onChange={(e) => setForm(onChangeForm(e, form))}
              required
              className="block w-full h-14 px-3 rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

          <div className="flex flex-col gap-4 justify-center sm:mx-auto sm:w-full sm:max-w-sm mx-26 px-6">
            <h2 className=" mt-1 text-start text-xs font-ibm leading-4 ">
              Ao continuar, você concorda com o nosso{" "}
              <a className="text-blue-500 underline ">Contrato de usuário</a> e
              nossa{" "}
              <a className="text-blue-500 underline ">
                Política de Privacidade
              </a>
            </h2>

            <div className="flex gap-2.5">
              <div>
                <input type="checkbox" id="to-agree" name="to-agree" />
              </div>

              <label
                for="to-agree"
                className=" text-start items-center text-sm font-ibm leading-4 "
              >
                Eu concordo em receber emails sobre coisas legais no Labeddit
              </label>
            </div>
          </div>

          <div>
            {!loading ? (
              <button
                type="submit"
                className="flex w-full h-12 justify-center items-center rounded-full bg-gradient-to-r from-pink-400 to-orange-500 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400"
                onClick={(e) => registeringUser(e)}
              >
                Cadastrar
              </button>
            ) : (
              <button
                type="submit"
                className="flex w-full h-12 justify-center items-center rounded-full bg-gradient-to-r from-pink-400 to-orange-500 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400 cursor-progress"
                disabled
              >
                <div className="h-8 w-8 border-4 border-1-gray-200 border-r-gray-200 border-b-gray-200 border-t-orange-500 animate-spin ease-linear rounded-full" />
              </button>
            )}
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
