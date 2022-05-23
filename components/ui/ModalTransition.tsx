import { Box, Modal, Typography } from "@mui/material";
import { FC } from "react";
import { Loader } from ".";

interface Props {
  isOpen: boolean;
  message?: string;
  onClose: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  outline: "none",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

export const ModalTransition: FC<Props> = ({ isOpen, onClose, message = "Operación en proceso" }) => {
  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2' align='center'>
            {message}
          </Typography>
          <Loader />
        </Box>
      </Modal>
    </>
  );
};
