import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { goToDetailsPage } from "../routes/coordinator";

export const CardPost = ({
  id,
  name,
  content,
  numberOfLike,
  numberOfDislike,
  comments,
}) => {
  const navigate = useNavigate();

  const [like, setLike] = useState(false);

  const likeDislike = Number(numberOfLike) + Number(numberOfDislike);

  return (
    <div className="flex flex-col w-full h-full border border-[#E0E0E0] rounded-xl p-2.5 gap-5">
      <div className="font-ibm text-xs text-[#6F6F6F]">enviado por: {name}</div>
      <div className="font-ibm">{content}</div>
      <div className="flex gap-3">
        <div className="flex gap-3 h-6 rounded-full border border-[#E0E0E0] items-center p-px">
          {!like ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-[#6F6F6F] icon icon-tabler icon-tabler-arrow-big-up"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              onClick={() => setLike((like) => !like)}
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
              onClick={() => setLike((like) => !like)}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M10.586 3l-6.586 6.586a2 2 0 0 0 -.434 2.18l.068 .145a2 2 0 0 0 1.78 1.089h2.586v7a2 2 0 0 0 2 2h4l.15 -.005a2 2 0 0 0 1.85 -1.995l-.001 -7h2.587a2 2 0 0 0 1.414 -3.414l-6.586 -6.586a2 2 0 0 0 -2.828 0z"
                stroke-width="0"
                fill="currentColor"
              ></path>
            </svg>
          )}

          <span className="text-[#6F6F6F] text-xs">{likeDislike}</span>

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
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M15 4v8h3.586a1 1 0 0 1 .707 1.707l-6.586 6.586a1 1 0 0 1 -1.414 0l-6.586 -6.586a1 1 0 0 1 .707 -1.707h3.586v-8a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1z"></path>
          </svg>
        </div>

        <div
          className="flex gap-3 h-6 rounded-full border border-[#E0E0E0] items-center px-2"
          onClick={id ? () => goToDetailsPage(navigate, id) : () => {}}
        >
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

          <span className="text-[#6F6F6F] text-xs">{comments?.length}</span>
        </div>
      </div>
    </div>
  );
};
