import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL_POST } from "../constants/BASE_URL";

export const useGetUsers = (path, authorization) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMensage] = useState("");

  const loadingData = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${BASE_URL_POST}/${path}`,
        authorization
      );

      setData(response.data);
      setLoading(false);
    } catch (erro) {
      console.log(erro.message);

      setLoading(false);
      setError(true);
      setErrorMensage(erro);
    }
  };

  useEffect(() => {
    loadingData();
  }, []);

  return [data, loading, error, errorMessage];
};
