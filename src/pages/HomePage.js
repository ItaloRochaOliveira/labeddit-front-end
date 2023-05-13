import { useEffect } from "react";
import { goToLoginPage } from "../routes/coordinator";
import { useNavigate } from "react-router-dom";
import { logo } from "../assents/img/exportImages";

export const HomePage = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");

    goToLoginPage(navigate);
  };

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify("4002"));
    const token = JSON.parse(localStorage.getItem("token"));

    if (!token) {
      goToLoginPage(navigate);
    }
  }, []);
  return (
    <div class="flex min-h-full flex-col justify-center ">
      <div class="mb-48">
        <div class="flex justify-between items-center bg-slate-200 h-12 mb-7 ">
          <div class="basis-1/4"></div>
          <div class="basis-1/2">
            <img class="mx-auto w-7 h-7 " src={logo} alt="logo da labenu" />
          </div>
          <div class="basis-1/4 text-blue-500 hover:text-blue-300 ">
            <button onClick={logout}>Logout</button>
          </div>
        </div>

        <div class="flex min-h-full flex-col justify-center  mx-26 px-6 py-12 lg:px-8">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <form type="submit" class="flex flex-col gap-3 justify-center mb-8">
              <input
                type="text"
                placeholder="Escreva seu post..."
                class="w-full h-36 border bg-gray-200 rounded-xl px-2 placeholder:inline-block placeholder:px-2 placeholder:items-top"
              />
              <button
                type="submit"
                class="flex w-full h-12 justify-center items-center rounded-full bg-gradient-to-r from-pink-400 to-orange-500 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 hover:from-orange-500 transition duration-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400"
              >
                Postar
              </button>
            </form>
            <hr class="border-gradient-to-r from-border-pink-400 to-border-orange-500" />
            aa
          </div>
        </div>
      </div>
    </div>
  );
};
