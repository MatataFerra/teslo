import Image from "next/image";
import { FC } from "react";
import { Box, Typography } from "@mui/material";

interface Props {
  icon: any;
  status: string;
  textColor?: string;
}

export const StatusOrderIcon: FC<Props> = ({ icon, status = "No status", textColor = "#32cb64" }) => {
  return (
    <Box display='flex' gap={1} p={1} alignItems='center'>
      {icon}
      <Typography variant='caption' color={textColor} whiteSpace='break-spaces'>
        {status}
      </Typography>
    </Box>
  );
};
