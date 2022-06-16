import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { ProfileTitle, UpdateData, ProfileAddress } from ".";

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
      <Box>
        <ProfileAddress />
      </Box>
      <Box mt={2}>
        <UpdateData />
      </Box>
    </Stack>
  );
};
