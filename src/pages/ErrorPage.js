import { useLocation, useNavigate } from "react-router-dom";
import { goToHomePage } from "../routes/coordinator";

export const ErrorPage = ({ error }) => {
  const navigate = useNavigate();
  const { key } = useLocation();
  console.log(key);

  return (
    <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <p class="text-base font-semibold text-pink-400">
          {key === "default" ? 404 : error}
        </p>
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {key === "default" ? "Page not found" : error}
        </h1>
        <p class="mt-6 text-base leading-7 text-gray-600">
          {key === "default"
            ? "Sorry, we couldn’t find the page you’re looking for."
            : error}
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#"
            class="rounded-md bg-gradient-to-r from-pink-400 to-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => goToHomePage(navigate)}
          >
            Go back home
          </a>
        </div>
      </div>
    </main>
  );
};
