import { useEffect } from "react";
import { goToLoginPage } from "../routes/coordinator";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    // const token = "00022";

    if (!token) {
      goToLoginPage(navigate);
    }
  }, []);
  return <div class="bg-red-500 w-50">home</div>;
};
