import { jwtVerify } from "jose";

export const useTokenManager = () => {
  const secret = new TextEncoder().encode("labeddit-front-end");

  const getPayload = async (token) => {
    try {
      const { payload } = await jwtVerify(token, secret);

      console.log(payload);

      return payload;
    } catch (e) {
      return "Token is invalid";
    }
  };

  return getPayload;
};
