import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL_POST } from "../constants/BASE_URL";

export const useCreatePosts = (
  id,
  body,
  authorization,
  controllRequestData
) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMensage] = useState("");

  const loadingData = async () => {
    setLoading(true);

    try {
      let response;

      if (!id) {
        response = await axios.post(`${BASE_URL_POST}`, body, authorization);
      } else {
        response = await axios.post(
          `${BASE_URL_POST}/${id}/comment`,
          body,
          authorization
        );
      }

      setData(response.data);
      setLoading(false);
    } catch (erro) {
      console.log(erro.message);

      setLoading(false);
      setError(true);
      setErrorMensage(erro.response);
    }
  };

  useEffect(() => {
    loadingData();
  }, [controllRequestData]);

  return [data, loading, error, errorMessage];
};
