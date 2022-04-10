import Head from "next/head";
import { FC } from "react";
import { Children } from "../../interfaces";
import { Box } from "@mui/material";

interface Props extends Children {
  title?: string;
}

export const AuthLayout: FC<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title> {title} </title>
      </Head>

      <main>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="calc(100vh - 200px)"
        >
          {children}
        </Box>
      </main>
    </>
  );
};
