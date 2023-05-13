import { logo } from "../assents/img/exportImages";
import { goToHomePage, goToLoginPage } from "../routes/coordinator";
import { useNavigate } from "react-router-dom";

export const SignupPage = () => {
  const navigate = useNavigate();

  return (
    <div class="flex min-h-full flex-col justify-center ">
      <div class="mb-48">
        <div class="flex justify-between items-center bg-slate-200 h-12 ">
          <div class="basis-1/4"></div>
          <div class="basis-1/2">
            <img class="mx-auto w-7 h-7 " src={logo} alt="logo da labenu" />
          </div>
          <div class="basis-1/4 text-blue-500 hover:text-blue-300 ">
            <button onClick={() => goToLoginPage(navigate)}>Entrar</button>
          </div>
        </div>

        <div class="sm:mx-auto sm:w-full sm:max-w-sm mx-26 px-6">
          <h2 class=" mt-1 text-center text-xl/10 font-ibm font-bold leading-10 ">
            Olá, boas vindas ao LabEddit ;)
          </h2>
        </div>
      </div>

      <div class="sm:mx-auto sm:w-full sm:max-w-sm mx-26 px-6">
        <form class="space-y-6" type="submit">
          <div class="flex items-center ">
            <input
              id="nickname"
              name="nickname"
              type="nickname"
              placeholder="Apelido"
              required
              class="block w-full h-14 px-3 rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="E-mail"
              required
              class="block w-full h-14 px-3 rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Senha"
              required
              class="block w-full h-14 px-3 rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full h-12 justify-center items-center rounded-full bg-gradient-to-r from-pink-400 to-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 hover:from-orange-500 transition duration-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
