import { useRouter } from "next/router";
import { FC, useReducer, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { tesloApi } from "../../api";
import { Children, IUser } from "../../interfaces";
import { AuthContext, authReducer } from "./";
import { useSession, signOut } from "next-auth/react";

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
  const router = useRouter();
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      return dispatch({ type: "[Auth] - Login", payload: data?.user as IUser });
    }
  }, [data, status]);

  // useEffect(() => {
  //   checkToken();
  // }, []);

  const checkToken = async () => {
    const token = Cookie.get("token");
    if (!token) {
      return;
    }

    try {
      const { data } = await tesloApi.get<Data>("/user/validate-token");

      Cookie.set("token", data.token);

      dispatch({
        type: "[Auth] - Login",
        payload: data.user,
      });
    } catch (error) {
      Cookie.remove("token");
    }
  };

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post("/user/login", { email, password });
      const { user, token } = data;
      Cookie.set("token", token);
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
      Cookie.set("token", token);
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

  const logoutUser = () => {
    // Cookies.remove("token");
    Cookie.remove("cart");
    Cookie.remove("firstName");
    Cookie.remove("lastName");
    Cookie.remove("address");
    Cookie.remove("address2");
    Cookie.remove("zip");
    Cookie.remove("city");
    Cookie.remove("country");
    Cookie.remove("phone");
    // router.reload();
    signOut();
    dispatch({ type: "[Auth] - Logout" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginUser,
        registerUser,
        logoutUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
