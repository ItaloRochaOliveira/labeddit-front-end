import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL_POST } from "../constants/BASE_URL";

export const useLikePosts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMensage] = useState("");

  const loadingData = async (id, path, body, authorization) => {
    setLoading(true);
    console.log(id);

    try {
      const response = await axios.post(
        `${BASE_URL_POST}/${id}/${path}/like`,
        body,
        authorization
      );

      setData(response.data);
      setLoading(false);

      console.log(response);
      return response.data;
    } catch (erro) {
      console.log(erro.message);

      setLoading(false);
      setError(true);
      setErrorMensage(erro);

      return erro.message;
    }
  };

  return [loadingData, loading, error, errorMessage];
};
