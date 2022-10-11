import { FC, useReducer, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { tesloApi } from "../../apiRoutes";
import { Children, IUser } from "../../interfaces";
import { AuthContext, authReducer } from "./";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

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
  const { data, status } = useSession() as any;
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      return dispatch({ type: "[Auth] - Login", payload: data?.user as IUser });
    }
  }, [data, status]);

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post("/user/login", { email, password });
      const { user, token } = data;

      Cookie.set("token", token);
      Cookie.remove("wishlist");
      Cookie.remove("userdataproducts");
      dispatch({ type: "[Auth] - Login", payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };

  const inactiveUser = async (): Promise<boolean> => {
    try {
      const { data } = await tesloApi.put("/user/me/delete");
      dispatch({ type: "[Auth] - Inactive", payload: data });
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
    Cookie.remove("wishlist");
    Cookie.remove("userdataproducts");
    router.reload();
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
        inactiveUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
