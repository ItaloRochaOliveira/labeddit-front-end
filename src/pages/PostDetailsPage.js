import { useNavigate } from "react-router-dom";
import { logo } from "../assents/img/exportImages";
import { CardPost } from "../components/CardPost";
import { logout } from "../utils/logout";
import { CardCommentPost } from "../components/CardCommentPost";
import { goToHomePage } from "../routes/coordinator";

export const PostDetailsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-full flex-col justify-center ">
      <div className="mb-48">
        <div className="flex justify-between items-center bg-slate-200 h-12 mb-1 ">
          <div className="basis-1/4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-9 h-9 text-[#A3A3A3] mx-5 hover:text-black"
              onClick={() => goToHomePage(navigate)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="basis-1/2">
            <img className="mx-auto w-7 h-7 " src={logo} alt="logo da labenu" />
          </div>
          <div className="basis-1/4 text-blue-500 hover:text-blue-300 ">
            <button onClick={() => logout(navigate)}>Logout</button>
          </div>
        </div>

        <div className="flex min-h-full flex-col  justify-center  mx-26 px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-3">
            <CardPost
              name={"nomeDoUser"}
              content={
                "Um texto do post, nesse caso é um exemplo de como vai aparecer, por isso ele precisa ser um texto extenso para ver como ele se comporta"
              }
              numberLike={122}
              comment={22}
            />

            <form
              type="submit"
              className="flex flex-col gap-2 justify-center mb-8"
            >
              <textarea
                placeholder="Adicionar comentário"
                className="w-full h-36 border bg-gray-200 rounded-xl p-4 resize-none "
                required
              />
              <button
                type="submit"
                className="flex w-full h-12 justify-center items-center rounded-xl bg-gradient-to-r from-[#FF6489] to-[#F9B24E] px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-[#F9B24E] hover:from-[#F9B24E] transition duration-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400"
              >
                Responder
              </button>
            </form>
            <hr className="h-0.5 w-full bg-gradient-to-r from-pink-400 to-orange-500 rounded-full mb-6" />

            <div>
              <CardCommentPost />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
