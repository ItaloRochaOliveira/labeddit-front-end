import axios from "axios";
import { useState } from "react";
import { BASE_URL_POST } from "../constants/BASE_URL";

export const useLikePosts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMensage] = useState("");

  const loadingData = async (id, path, body, authorization) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL_POST}/${id}/${path}/like`,
        body,
        authorization
      );

      setLoading(false);

      return response.data;
    } catch (erro) {
      console.log(erro.message);

      setLoading(false);
      setError(true);
      setErrorMensage(erro.response);

      return erro.message;
    }
  };

  return [loadingData, loading, error, setError, errorMessage];
};
