import { useNavigate, useParams } from "react-router-dom";
import { logo } from "../assents/img/exportImages";
import { CardPost } from "../components/CardPost";
import { logout } from "../utils/logout";
import { CardCommentPost } from "../components/CardCommentPost";
import { goToHomePage } from "../routes/coordinator";
import { useGetPosts } from "../hooks/useGetPosts";
import { useEffect, useState } from "react";
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
  console.log(errorMessageCreatedPost);

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
      !loading &&
      data !== undefined && (
        <div className="flex min-h-full flex-col justify-center ">
          <div className="mb-48">
            <div className="flex justify-around items-center bg-slate-200 h-12 mb-1 ">
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
                <img
                  className="mx-auto w-7 h-7 "
                  src={logo}
                  alt="logo da labenu"
                />
              </div>
              <div className="basis-1/4 text-blue-500 hover:text-blue-300 ">
                <button onClick={() => logout(navigate)}>Logout</button>
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
                  {data.comments.length > 0 &&
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
                      })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
};
