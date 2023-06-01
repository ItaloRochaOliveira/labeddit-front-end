import axios from "axios";
import { BASE_URL_USER } from "../constants/BASE_URL";
import { useState } from "react";

export const useRequestDataUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMensage] = useState("");

  const loadingData = async (path, body) => {
    setLoading(true);

    try {
      const { data } = await axios.post(`${BASE_URL_USER}/${path}`, body);

      setLoading(false);

      return data;
    } catch (erro) {
      console.log(erro);

      setLoading(false);
      setError(true);
      setErrorMensage(erro);

      return erro;
    }
  };

  return [loadingData, loading, error, setError, errorMessage];
};
