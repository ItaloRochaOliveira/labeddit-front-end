import { useEffect, useState } from "react";

export const MessageErro404 = ({ value }) => {
  const [open, setOpen] = useState(false);

  const [style, setStyle] = useState(
    "transform  transition-opacity trnasition duration-300"
  );

  useEffect(() => {
    !value &&
      setStyle("transform -translate-x-full transition duration-700") &&
      setTimeout(() => {
        setStyle("transform  transition-opacity trnasition duration-300");
      }, 3000);
  }, []);

  //   style === "transform  transition-opacity trnasition duration-300"
  //     ? setStyle(
  //         (sty) => (sty = "transform transition-opacity trnasition duration-300")
  //       )
  //     : setStyle(
  //         (sty) =>
  //           (sty =
  //             "transform -translate-x-full transition-opacity trnasition duration-300")
  //       );

  return (
    <div className={"" /*open ? " sticky top-2" : "hidden opacity-0 " */}>
      <div className={style}>
        <div class="flex justify-between text-blue-200 shadow-inner rounded p-3 bg-blue-600">
          <p class="self-center">
            <strong>Erro </strong>O usuário não pode comentar no seu próprio
            comentário.
          </p>
          <strong class="text-xl align-center cursor-pointer alert-del">
            &times;
          </strong>
        </div>
      </div>
    </div>
  );
};
