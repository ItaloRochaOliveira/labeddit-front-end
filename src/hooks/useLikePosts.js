import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL_POST } from "../constants/BASE_URL";

export const useLikePosts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMensage] = useState("");

  const loadingData = async (id, authorization) => {
    setLoading(true);

    try {
      let response;

      if (!id) {
        response = await axios.get(`${BASE_URL_POST}`, authorization);
      } else {
        response = await axios.get(`${BASE_URL_POST}/${id}`, authorization);
      }

      setData(response.data);
      setLoading(false);

      return response.data;
    } catch (erro) {
      console.log(erro.message);

      setLoading(false);
      setError(true);
      setErrorMensage(erro);

      return erro.message;
    }
  };

  return { loadingData, loading, error, errorMessage };
};
