import { Box, Divider, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { ProfileTitle } from ".";

interface Props {
  name: string;
  email: string;
}

export const PersonalData: FC<Props> = ({ name, email }) => {
  return (
    <Stack className='fadeIn'>
      <ProfileTitle title='Datos personales' />
      <Divider />
      <Box mt={2}>
        <Typography>Nombre: {name}</Typography>
        <Typography>Email: {email}</Typography>
      </Box>
    </Stack>
  );
};
