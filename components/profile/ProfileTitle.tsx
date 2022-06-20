import { Box, Typography, Link, Chip } from "@mui/material";
import NextLink from "next/link";
import { FC, useContext } from "react";
import { AuthContext } from "../../context";

interface Props {
  title: string;
  link?: boolean;
  href?: string;
  linkTitle?: string;
}

export const ProfileTitle: FC<Props> = ({ title = "Default Title", link = false, href = "/", linkTitle }) => {
  const { user } = useContext(AuthContext);

  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <Box display='flex' alignItems='center' gap={2} mb={2}>
        <Typography variant='h6' color='primary'>
          {title}
        </Typography>
        {user && user?.active ? (
          <Chip size='small' color='success' variant='filled' label='Usuario activo' />
        ) : (
          <Chip size='small' color='error' variant='filled' label='Usuario inactivo' />
        )}
      </Box>

      {link && (
        <NextLink href={href} passHref>
          <Link variant='button' underline='always' color='secondary' component='button'>
            {linkTitle}
          </Link>
        </NextLink>
      )}
    </Box>
  );
};
