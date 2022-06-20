import { Warning } from "@mui/icons-material";
import { Box, CircularProgress, Tooltip, Typography } from "@mui/material";
import { FC } from "react";
import { OrderStatus } from "../../interfaces";

interface Props {
  status: string;
  opacityLoader: number;
  orderError: boolean;
}

export const OrderItemStatus: FC<Props> = ({ status, opacityLoader, orderError }) => {
  return (
    <Box display='flex' alignItems='center'>
      {opacityLoader > 0 && !orderError && (
        <CircularProgress thickness={2} size={15} sx={{ mr: 1, opacity: opacityLoader }} />
      )}

      {orderError ? (
        <Box display='flex' alignItems='center' gap={1} className='shake'>
          <Tooltip title='Error al actualizar el estado de la orden' placement='top' arrow>
            <Typography color='error'>{status}</Typography>
          </Tooltip>
          <Warning fontSize='small' color='error' />
        </Box>
      ) : (
        <Typography>{status}</Typography>
      )}
    </Box>
  );
};
