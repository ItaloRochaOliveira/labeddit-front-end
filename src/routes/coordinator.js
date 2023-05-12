export const goToHomePage = (navigate) => {
  navigate("*");
};

export const goToLoginPage = (navigate) => {
  navigate("/login");
};

export const goToSignupPage = (navigate) => {
  navigate("/signup");
};

export const goToDetailsPage = (navigate, id) => {
  navigate(`/details/${id}`);
};
