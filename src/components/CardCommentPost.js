import { useEffect, useState } from "react";
import { useLikePosts } from "../hooks/useLikePosts";
import { useTokenManager } from "../hooks/useTokenManage";
import { ToastContainer, toast } from "react-toastify";

export const CardCommentPost = ({
  id,
  idCreatorComment,
  name,
  content,
  numberOfLike,
  numberOfDislike,
  impressions,

  toResult,
}) => {
  const [loadingData, loading, error, setError, errorMessage] = useLikePosts();
  const getPayload = useTokenManager();

  const [payload, setPayload] = useState("");

  const gettingPayload = async () => {
    const payload = await getPayload(localStorage.getItem("token"));

    setPayload(payload);
  };

  const callPayload = gettingPayload();

  const [rate, setRate] = useState(false);
  const [like, setLike] = useState(null);
  const [dislike, setDislike] = useState(null);

  const doLike = () => {
    loadingData(id, "comment", { like: true }, authorization);

    if (payload.id !== idCreatorComment) {
      setRate(true);
      setDislike(false);
      setLike((like) => !like);
    }
  };

  const doDislike = () => {
    loadingData(id, "comment", { like: false }, authorization);

    if (payload.id !== idCreatorComment) {
      setRate(true);
      setLike(false);
      setDislike((dislike) => !dislike);
    }
  };

  const authorization = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  const likeDislike = Number(numberOfLike) - Number(numberOfDislike);

  error &&
    toast.error(errorMessage.data, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }) &&
    setError(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps

    if (like === null || dislike === null) {
      impressions.map((impression) => {
        payload.id === impression.idUser &&
          impression.like === 0 &&
          setDislike(true);

        payload.id === impression.idUser &&
          impression.like === 1 &&
          setLike(true);
      });
    }
  }, [impressions]);

  useEffect(() => {
    toResult();

    setRate(false);
  }, [rate]);

  return (
    <div className="flex flex-col w-full h-full border border-[#E0E0E0] rounded-xl p-2.5 gap-5">
      <div className="font-ibm text-xs text-[#6F6F6F]">enviado por: {name}</div>
      <div className="font-ibm">{content}</div>
      <div className="flex gap-3">
        <div className="flex gap-3 h-6 rounded-full border border-[#E0E0E0] items-center p-px">
          {!like || dislike ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-[#6F6F6F] icon icon-tabler icon-tabler-arrow-big-up"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              onClick={doLike}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M9 20v-8h-3.586a1 1 0 0 1 -.707 -1.707l6.586 -6.586a1 1 0 0 1 1.414 0l6.586 6.586a1 1 0 0 1 -.707 1.707h-3.586v8a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-orange-500 icon icon-tabler icon-tabler-arrow-big-up-filled"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              onClick={doLike}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M10.586 3l-6.586 6.586a2 2 0 0 0 -.434 2.18l.068 .145a2 2 0 0 0 1.78 1.089h2.586v7a2 2 0 0 0 2 2h4l.15 -.005a2 2 0 0 0 1.85 -1.995l-.001 -7h2.587a2 2 0 0 0 1.414 -3.414l-6.586 -6.586a2 2 0 0 0 -2.828 0z"
                stroke-width="0"
                fill="currentColor"
              ></path>
            </svg>
          )}

          <span className="text-[#6F6F6F] text-xs">
            {likeDislike >= 0 ? likeDislike : 0}
          </span>

          {!dislike || like ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-[#6F6F6F] icon icon-tabler icon-tabler-arrow-big-down"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              onClick={doDislike}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M15 4v8h3.586a1 1 0 0 1 .707 1.707l-6.586 6.586a1 1 0 0 1 -1.414 0l-6.586 -6.586a1 1 0 0 1 .707 -1.707h3.586v-8a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1z"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-orange-500 icon icon-tabler icon-tabler-arrow-big-down-filled"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              onClick={doDislike}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M10 2l-.15 .005a2 2 0 0 0 -1.85 1.995v6.999l-2.586 .001a2 2 0 0 0 -1.414 3.414l6.586 6.586a2 2 0 0 0 2.828 0l6.586 -6.586a2 2 0 0 0 .434 -2.18l-.068 -.145a2 2 0 0 0 -1.78 -1.089l-2.586 -.001v-6.999a2 2 0 0 0 -2 -2h-4z"
                stroke-width="0"
                fill="currentColor"
              ></path>
            </svg>
          )}
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
      </div>
    </div>
  );
};
