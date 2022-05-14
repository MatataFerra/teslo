import { FC, useContext } from "react";
import { useRouter } from "next/router";

import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material";
import NextLink from "next/link";
import { UiContext } from "../../context/";
import { ArrowBack } from "@mui/icons-material";
import HouseIcon from "@mui/icons-material/House";

interface Props {
  back?: boolean;
}

export const AdminNavbar: FC<Props> = ({ back = false }) => {
  const { toogleSideMenu } = useContext(UiContext);
  const router = useRouter();

  return (
    <AppBar>
      <Toolbar>
        <NextLink href='/' passHref>
          <Link display='flex' alignItems='center'>
            <Typography variant='h6'> Teslo </Typography>
            <Typography variant='h6' sx={{ ml: 0.5 }}>
              Shop
            </Typography>
          </Link>
        </NextLink>
        <Box flex={1} />
        <Box display='flex' gap={2}>
          {back && (
            <Button startIcon={<ArrowBack />} variant='contained' color='primary' onClick={() => router.back()}>
              Back
            </Button>
          )}

          <Button color='primary' onClick={() => router.push("/admin")}>
            <HouseIcon />
          </Button>

          <Button onClick={toogleSideMenu}>Menú</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
