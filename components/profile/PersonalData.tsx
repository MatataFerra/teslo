import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { FC, useContext } from "react";
import { ProfileTitle, UpdateData, ProfileAddress } from ".";
import { tesloApi } from "../../api";
import { AuthContext } from "../../context";

interface Props {
  name: string;
  email: string;
}

export const PersonalData: FC<Props> = ({ name, email }) => {
  const { inactiveUser, user } = useContext(AuthContext);

  const onDeleteUser = () => {
    inactiveUser();
  };

  return (
    <Stack className='fadeIn' spacing={2}>
      <Box>
        <ProfileTitle title='Datos personales' />
        <Divider />
      </Box>
      <Box>
        <Typography>Nombre: {name}</Typography>
        <Typography>Email: {email}</Typography>
        <ProfileAddress />
      </Box>
      <Box>
        <UpdateData />
      </Box>
      <Box mt={"2rem !important"}>
        <Button sx={{ width: "fit-content" }} color='error' onClick={onDeleteUser} disabled={!user?.active}>
          {!user?.active ? "Cuenta desactivada" : "No quiero usar más la cuenta"}
        </Button>
      </Box>
    </Stack>
  );
};
