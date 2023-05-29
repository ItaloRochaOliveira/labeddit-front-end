import { useEffect, useState } from "react";
import { logo } from "../assents/img/exportImages";
import { goToHomePage, goToSignupPage } from "../routes/coordinator";
import { useNavigate } from "react-router-dom";
import { onChangeForm } from "../utils/onChangeForm";
import { requestDataUser } from "../hooks/requestDataUser";

export const LoginPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMensage] = useState("");

  const [form, setForm] = useState({ email: "", password: "" });
  const [token, setToken] = useState("");

  const registeringUser = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await requestDataUser("login", form);
      console.log(response);
      setData(response);
      setLoading(false);
    } catch (erro) {
      console.log(erro);

      setLoading(false);
      setError(true);
      setErrorMensage(erro);
    }
  };

  useEffect(() => {
    if (data.message) {
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

          <div className="flex items-center ">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Senha"
              value={form.password}
              onChange={(event) => setForm(onChangeForm(event, form))}
              required
              className="block w-full h-14 px-3 rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full h-12 justify-center items-center rounded-full bg-gradient-to-r from-pink-400 to-orange-500 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 hover:from-orange-500 transition duration-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400"
              onClick={(e) => registeringUser(e)}
            >
              Continuar
            </button>
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
      </div>
    </div>
  );
};
