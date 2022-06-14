import { Box, Typography, Link } from "@mui/material";
import NextLink from "next/link";
import { FC } from "react";

interface Props {
  title: string;
  link?: boolean;
  href?: string;
  linkTitle?: string;
}

export const ProfileTitle: FC<Props> = ({ title = "Default Title", link = false, href = "/", linkTitle }) => {
  return (
    <Box display='flex' justifyContent='space-between'>
      <Typography variant='h6' color='primary'>
        {title}
      </Typography>
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
