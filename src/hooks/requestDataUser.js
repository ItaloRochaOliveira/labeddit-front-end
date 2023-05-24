import axios from "axios";
import { BASE_URL_USER } from "../constants/BASE_URL";

export const requestDataUser = async (path, body) => {
  try {
    console.log(body);
    const { data } = await axios.post(`${BASE_URL_USER}/${path}`, body);

    return data;
  } catch (erro) {
    console.log(erro);
  }
};
