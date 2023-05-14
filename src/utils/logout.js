import { goToLoginPage } from "../routes/coordinator";

export const logout = (navigate) => {
  localStorage.removeItem("token");

  goToLoginPage(navigate);
};
