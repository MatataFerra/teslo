import { Image } from "@mui/icons-material";
import { Avatar, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";

export const AsideMenu: FC = () => {
  return (
    <Grid container>
      <Grid item xs={2} alignItems='center'>
        <Stack spacing={2}>
          <Avatar
            sx={{ height: 150, width: 150, margin: "0 auto" }}
            alt='Remy Sharp'
            src='https://via.placeholder.com/150'
          />
          {/* Menu List */}
        </Stack>
      </Grid>
    </Grid>
  );
};
