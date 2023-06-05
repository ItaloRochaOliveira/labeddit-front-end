import { useNavigate, useParams } from "react-router-dom";
import { logo } from "../assents/img/exportImages";
import { CardPost } from "../components/CardPost";
import { logout } from "../utils/logout";
import { CardCommentPost } from "../components/CardCommentPost";
import { goToHomePage } from "../routes/coordinator";
import { useGetPosts } from "../hooks/useGetPosts";
import { lazy, useEffect, useState } from "react";
import { useCreatePosts } from "../hooks/useCreatePosts";
import { onChangeForm } from "../utils/onChangeForm";
import { ToastContainer, toast } from "react-toastify";
import { MessageErro404 } from "../components/MessageErro404";
import { ErrorPage } from "./ErrorPage";

export const PostDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({ content: "" });

  const authorization = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  const [[data], setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const [loadingData, error, errorMessage] = useGetPosts();
  const [
    loadingCreatePostData,
    loadingCreatedPost,
    errorCreatedPost,
    setErrorMessage,
    errorMessageCreatedPost,
  ] = useCreatePosts();

  const toResult = async () => {
    const response = await loadingData(id, authorization);

    response.length && setData(response[0]) && setLoading(response[1]);
  };

  const creatPost = async (e) => {
    e.preventDefault();

    setResponse(await loadingCreatePostData(id, form, authorization));
    setForm({ content: "" });
  };

  errorCreatedPost &&
    toast.error(
      errorMessageCreatedPost.data[0].message || errorMessageCreatedPost.data,
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
    setErrorMessage(false);

  useEffect(() => {
    toResult();
  }, [data]);

  if (error) {
    return <ErrorPage error={errorMessage} />;
  } else {
    return (
      <div className="flex min-h-full flex-col justify-center ">
        <div className="mb-48">
          <div className="flex justify-around items-center bg-slate-200 h-12 mb-1">
            <div className="basis-1/4 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-9 h-9 text-[#A3A3A3] ml-5 hover:text-black"
                onClick={() => goToHomePage(navigate)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="flex justify-center basis-1/2 ">
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

          <div className="flex min-h-full flex-col  justify-center  mx-26 px-6 py-12 lg:px-8">
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

            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-3">
              {!data ? (
                <div class="border border-[#E0E0E0] shadow rounded-md p-4 max-w-sm w-full mx-auto">
                  <div class="animate-pulse flex space-x-4">
                    <div class="flex-1 space-y-6 py-1">
                      <div class="grid grid-cols-6 gap-2">
                        <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                        <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                      </div>

                      <div class="space-y-3">
                        <div class="h-2 bg-slate-200 rounded"></div>
                        <div class="h-2 w-44 bg-slate-200 rounded"></div>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex gap-1 h-6 rounded-full border border-[#E0E0E0] items-center p-px">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-[#6F6F6F] icon icon-tabler icon-tabler-arrow-big-up"
                            viewBox="0 0 24 24"
                            stroke-width="1"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <path d="M9 20v-8h-3.586a1 1 0 0 1 -.707 -1.707l6.586 -6.586a1 1 0 0 1 1.414 0l6.586 6.586a1 1 0 0 1 -.707 1.707h-3.586v8a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
                          </svg>

                          <div class="h-4 w-4 rounded-full bg-slate-200"></div>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-[#6F6F6F] icon icon-tabler icon-tabler-arrow-big-down"
                            viewBox="0 0 24 24"
                            stroke-width="1"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <path d="M15 4v8h3.586a1 1 0 0 1 .707 1.707l-6.586 6.586a1 1 0 0 1 -1.414 0l-6.586 -6.586a1 1 0 0 1 .707 -1.707h3.586v-8a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1z"></path>
                          </svg>
                        </div>

                        <div className="flex gap-3 h-6 rounded-full border border-[#E0E0E0] items-center px-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 25 25"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-4 h-6 text-[#6F6F6F]"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                            />
                          </svg>

                          <div class="h-4 w-4 rounded-full bg-slate-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                !loading &&
                data !== undefined && (
                  <CardPost
                    id={id}
                    idCreatorPost={data.creator.id}
                    name={data.creator.name}
                    content={data.content}
                    numberOfLike={data.likes}
                    numberOfDislike={data.dislikes}
                    comments={data.comments}
                    impressions={data.impressions}
                    toResult={toResult}
                  />
                )
              )}

              <form
                type="submit"
                className="flex flex-col gap-2 justify-center mb-8"
              >
                <textarea
                  id="content"
                  name="content"
                  placeholder="Adicionar comentário"
                  className="w-full h-36 border bg-gray-200 rounded-xl p-4 resize-none "
                  value={form.content}
                  onChange={(e) => setForm(onChangeForm(e, form))}
                  required
                />
                {!loadingCreatedPost ? (
                  <button
                    className="flex w-full h-12 justify-center items-center rounded-xl bg-gradient-to-r from-[#FF6489] to-[#F9B24E] px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400"
                    onClick={(e) => creatPost(e)}
                  >
                    Responder
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

              <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-3">
                {!data ? (
                  <div className="flex flex-col gap-2.5 w-full h-12 justify-center items-center">
                    <div className="h-12 w-12 border-4 border-1-gray-200 border-r-gray-200 border-b-gray-200 border-t-orange-500 animate-spin ease-linear rounded-full" />
                  </div>
                ) : (
                  data.comments.length > 0 &&
                  data.comments
                    .sort((a, b) => {
                      const itemAtual = a.createdAt;
                      const itemProximo = b.createdAt;

                      return itemAtual > itemProximo ? -1 : 1;
                    })
                    .map((comment) => {
                      return (
                        <CardCommentPost
                          key={comment.id}
                          id={comment.id}
                          idCreatorComment={comment.creator.id}
                          name={comment.creator.name}
                          content={comment.content}
                          numberOfLike={comment.likes}
                          numberOfDislike={comment.dislikes}
                          impressions={comment.impressions}
                          toResult={toResult}
                        />
                      );
                    })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
