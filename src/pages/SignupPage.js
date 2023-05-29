import { useEffect, useState } from "react";
import { logo } from "../assents/img/exportImages";
import { goToHomePage, goToLoginPage } from "../routes/coordinator";
import { useNavigate } from "react-router-dom";
import { onChangeForm } from "../utils/onChangeForm";
import { requestDataUser } from "../hooks/requestDataUser";

export const SignupPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMensage] = useState("");

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const registeringUser = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await requestDataUser("signup", form);

      setData(response);
      setLoading(false);
    } catch (erro) {
      console.log(erro.message);

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
    <div className="flex min-h-full flex-col justify-center ">
      <div className="mb-48">
        <div className="flex justify-between items-center bg-slate-200 h-12 mb-7 ">
          <div className="basis-1/4"></div>
          <div className="basis-1/2">
            <img className="mx-auto w-7 h-7 " src={logo} alt="logo da labenu" />
          </div>
          <div className="basis-1/4 text-blue-500 hover:text-blue-300 ">
            <button onClick={() => goToLoginPage(navigate)}>Entrar</button>
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

          <div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Senha"
              value={form.password}
              onChange={(e) => setForm(onChangeForm(e, form))}
              required
              className="block w-full h-14 px-3 rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
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
            <button
              type="submit"
              className="flex w-full h-12 justify-center items-center rounded-full bg-gradient-to-r from-pink-400 to-orange-500 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 hover:from-orange-500 transition duration-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400"
              onClick={(e) => registeringUser(e)}
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
