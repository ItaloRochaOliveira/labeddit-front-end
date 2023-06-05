import { useEffect, useState } from "react";
import { goToLoginPage } from "../routes/coordinator";
import { useNavigate } from "react-router-dom";
import { logo } from "../assents/img/exportImages";
import { CardPost } from "../components/CardPost";
import { logout } from "../utils/logout";
import { useGetPosts } from "../hooks/useGetPosts";
import { onChangeForm } from "../utils/onChangeForm";
import { useCreatePosts } from "../hooks/useCreatePosts";
import { ErrorPage } from "./ErrorPage";
import { ToastContainer, toast } from "react-toastify";
import { useTokenManager } from "../hooks/useTokenManage";

export const HomePage = () => {
  const navigate = useNavigate();

  const getPayload = useTokenManager();
  const [payload, setPayload] = useState("");

  const gettingPayload = async () => {
    const payload = await getPayload(localStorage.getItem("token"));
    console.log(payload);

    setPayload(payload);
  };

  if (payload === "Token is invalid") {
    localStorage.removeItem("token");

    goToLoginPage(navigate);
  }

  const result = gettingPayload();

  const [form, setForm] = useState({ content: "" });

  const authorization = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const [loadingData, error, errorMessage] = useGetPosts();
  const [
    loadingCreatePostData,
    loadingCreatedPost,
    errorCreatedPost,
    setErrorCreatedPost,
    errorMessageCreatedPost,
  ] = useCreatePosts();

  const toResult = async () => {
    const response = await loadingData("", authorization);

    response.length && setData(response[0]) && setLoading(response[1]);
  };

  const creatPost = async (e) => {
    e.preventDefault();

    setResponse(loadingCreatePostData("", form, authorization));

    setForm({ content: "" });
  };

  errorCreatedPost &&
    toast.error(errorMessageCreatedPost.data[0].message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }) &&
    setErrorCreatedPost(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(payload);

    if (!token && payload === "Token is invalid") {
      localStorage.removeItem("token");

      goToLoginPage(navigate);
    }

    toResult();
  }, [response]);

  if (error) {
    return <ErrorPage error={errorMessage} />;
  } else {
    return (
      <div className="flex min-h-full flex-col justify-center ">
        <div className="mb-48">
          <div className="flex justify-between items-center bg-slate-200 h-12 mb-1 ">
            <div className="basis-1/4"></div>
            <div className="basis-1/2">
              <img
                className="mx-auto w-7 h-7 "
                src={logo}
                alt="logo da labenu"
              />
            </div>
            <div className="flex justify-end basis-1/4 text-blue-500 hover:text-blue-300">
              <button className="mr-5" onClick={() => logout(navigate)}>
                Logout
              </button>
            </div>
          </div>

          <div className="flex min-h-full flex-col justify-center  mx-26 px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                type="submit"
                className="flex flex-col gap-3 justify-center mb-8"
              >
                <textarea
                  id="content"
                  name="content"
                  value={form.content}
                  onChange={(e) => setForm(onChangeForm(e, form))}
                  placeholder="Escreva seu post..."
                  className="w-full h-36 border bg-gray-200 rounded-xl p-4 resize-none"
                  maxLength={"131px"}
                  required
                />
                {!loadingCreatedPost ? (
                  <button
                    type="submit"
                    className="flex w-full h-12 justify-center items-center rounded-xl bg-gradient-to-r from-[#FF6489] to-[#F9B24E] px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400"
                    onClick={(e) => creatPost(e)}
                  >
                    Postar
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex w-full h-12 justify-center items-center rounded-xl bg-gradient-to-r from-[#FF6489] to-[#F9B24E] px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400 cursor-progress"
                    disabled
                  >
                    <div className="h-8 w-8 border-4 border-1-gray-200 border-r-gray-200 border-b-gray-200 border-t-orange-500 animate-spin ease-linear rounded-full" />
                  </button>
                )}
              </form>
              <hr className="h-0.5 w-full bg-gradient-to-r from-pink-400 to-orange-500 rounded-full mb-6" />

              {!data.length ? (
                <div className="flex flex-col gap-2.5 w-full h-12 justify-center items-center">
                  <div className="h-12 w-12 border-4 border-1-gray-200 border-r-gray-200 border-b-gray-200 border-t-orange-500 animate-spin ease-linear rounded-full" />
                </div>
              ) : (
                !loading &&
                data !== undefined && (
                  <div className="flex flex-col gap-2.5">
                    {data
                      .sort((a, b) => {
                        const itemAtual = a.createdAt;
                        const itemProximo = b.createdAt;

                        return itemAtual > itemProximo ? -1 : 1;
                      })
                      .map((user) => {
                        return (
                          <CardPost
                            key={user.id}
                            id={user.id}
                            idCreatorPost={user.creator.id}
                            name={user.creator.name}
                            content={user.content}
                            numberOfLike={user.likes}
                            numberOfDislike={user.dislikes}
                            comments={user.comments}
                            impressions={user.impressions}
                            toResult={toResult}
                            payload={payload}
                          />
                        );
                      })}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

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
    );
  }
};
