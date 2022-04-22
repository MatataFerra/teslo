import axios from "axios";
import Cookies from "js-cookie";
import { FC, useReducer, useEffect } from "react";
import { tesloApi } from "../../api";
import { Children, IUser } from "../../interfaces";
import { AuthContext, authReducer } from "./";

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

type Data = {
  token: string | Error;
  user: IUser;
};

export const AuthProvider: FC<Children> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = Cookies.get("token");
    if (!token) {
      return;
    }

    try {
      const { data } = await tesloApi.get<Data>("/user/validate-token");

      Cookies.set("token", data.token, { expires: 1 });

      dispatch({
        type: "[Auth] - Login",
        payload: data.user,
      });
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post("/user/login", { email, password });
      const { user, token } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await tesloApi.post("/user/register", {
        name,
        email,
        password,
      });
      const { user, token } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });

      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: "No se pudo crear el usuario - Intente de nuevo",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginUser,
        registerUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
