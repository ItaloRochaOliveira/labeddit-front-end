import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { SignupPage } from "../pages/SignupPage";
import { LoginPage } from "../pages/LoginPage";
import { PostDetailsPage } from "../pages/PostDetailsPage";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/details/:id" element={<PostDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};
