import { useEffect } from "react";
import { goToLoginPage } from "../routes/coordinator";
import { useNavigate } from "react-router-dom";
import { logo } from "../assents/img/exportImages";
import { CardPost } from "../components/CardPost";
import { logout } from "../utils/logout";

export const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify("4002"));
    const token = JSON.parse(localStorage.getItem("token"));

    if (!token) {
      goToLoginPage(navigate);
    }
  }, []);
  return (
    <div className="flex min-h-full flex-col justify-center ">
      <div className="mb-48">
        <div className="flex justify-between items-center bg-slate-200 h-12 mb-1 ">
          <div className="basis-1/4"></div>
          <div className="basis-1/2">
            <img className="mx-auto w-7 h-7 " src={logo} alt="logo da labenu" />
          </div>
          <div className="basis-1/4 text-blue-500 hover:text-blue-300 ">
            <button onClick={() => logout(navigate)}>Logout</button>
          </div>
        </div>

        <div className="flex min-h-full flex-col justify-center  mx-26 px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              type="submit"
              className="flex flex-col gap-3 justify-center mb-8"
            >
              <textarea
                placeholder="Escreva seu post..."
                className="w-full h-36 border bg-gray-200 rounded-xl p-4 resize-none"
                maxLength={"131px"}
                required
              />
              <button
                type="submit"
                className="flex w-full h-12 justify-center items-center rounded-xl bg-gradient-to-r from-[#FF6489] to-[#F9B24E] px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-[#F9B24E] hover:from-[#F9B24E] transition duration-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400"
              >
                Postar
              </button>
            </form>
            <hr className="h-0.5 w-full bg-gradient-to-r from-pink-400 to-orange-500 rounded-full mb-6" />

            <div className="flex flex-col gap-2.5">
              <CardPost
                name={"nomeDoUser"}
                content={
                  "Um texto do post, nesse caso é um exemplo de como vai aparecer, por isso ele precisa ser um texto extenso para ver como ele se comporta"
                }
                numberLike={122}
                comment={22}
              />
              <CardPost
                name={"nomeDoUser"}
                content={
                  "Um texto do post, nesse caso é um exemplo de como vai aparecer, por isso ele precisa ser um texto extenso para ver como ele se comporta"
                }
                numberLike={122}
                comment={22}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
