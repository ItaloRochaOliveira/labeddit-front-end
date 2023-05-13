import { logo } from "../assents/img/exportImages";
import { goToSignupPage } from "../routes/coordinator";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div class="flex min-h-full flex-col justify-center mx-26 px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto w-21 h-21 " src={logo} alt="logo da labenu" />
        <h2 class=" mt-1 text-center text-xl/10 font-ibm font-bold leading-10 ">
          LabEddit
        </h2>
        <p class="mb-28 text-center text-4x1 font-ibm leading-5 ">
          O projeto de rede social da Labenu
        </p>
      </div>

      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-4" type="submit">
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

          <div class="flex items-center ">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Senha"
              required
              class="block w-full h-14 px-3 rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full h-12 justify-center items-center rounded-full bg-gradient-to-r from-pink-400 to-orange-500 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 hover:from-orange-500 transition duration-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400"
            >
              Continuar
            </button>
          </div>
          <hr />
          <div>
            <button
              onClick={() => goToSignupPage(navigate)}
              class="flex w-full h-12 justify-center items-center bg-white px-3 py-1.5 text-lg font-semibold leading-6 border rounded-full text-orange-500 border-orange-500 border-solid shadow-sm hover:bg-orange-500 hover:text-white transition duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              Crie uma conta!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
