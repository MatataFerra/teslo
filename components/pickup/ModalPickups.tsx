import { FC, useContext, useEffect } from "react";
import { useSnackbar } from "notistack";
import { PickupContext } from "../../context";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Modal,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { tesloApi } from "../../apiRoutes";
import { TagManager } from "../ui";
import { defaultPickup } from "../../utils";

interface FormData {
  name: string;
  latitude: string;
  longitude: string;
  tags: string[];
}

export const ModalPickups: FC = () => {
  const { onPickupModal, pickupModal, pickup, setPickup } = useContext(PickupContext);
  const { enqueueSnackbar } = useSnackbar();

  const { handleSubmit, getValues, setValue } = useForm<FormData>({
    defaultValues: { ...pickup, tags: [] },
  });

  useEffect(() => {
    setValue("latitude", pickup.latitude);
    setValue("longitude", pickup.longitude);
    setValue("name", pickup.name);
  }, [pickup.latitude, pickup.longitude, pickup.name, setValue]);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: "70%", md: "40%", lg: "30%" },
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const onSubmit = async (data: FormData) => {
    const { name, latitude, longitude } = data;
    onPickupModal("[Pickup] - Close modal");

    if (name.trim() === "") {
      return;
    }

    if (!latitude || !longitude) {
      return;
    }

    setPickup(defaultPickup);

    try {
      await tesloApi.post("/admin/pickup", data);

      enqueueSnackbar("Sucursal creada con éxito", { variant: "success" });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("La sucursal ya existe o hubo un error", { variant: "error" });
    }
  };

  return (
    <Modal
      open={pickupModal}
      onClose={() => onPickupModal("[Pickup] - Close modal")}
      aria-labelledby='modal-title'
      aria-describedby='modal-modal-description'>
      <Box sx={style}>
        <Alert severity='info'>
          <AlertTitle>Agregar Sucursales</AlertTitle>
          Primero seleccioná una sucursal con el buscador y luego de verificar que es correcta
          aparecerán las coordenadas y el título acá
        </Alert>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader title='Nombre' subheader={`${pickup.name}`} />
            <CardContent>
              <Typography variant='inherit'>Coordenadas: </Typography>
              <Box display='flex' gap={2}>
                <Typography variant='caption'>Latitud: {pickup.latitude.slice(0, 7)}</Typography>
                <Typography variant='caption'>Longitud: {pickup.longitude.slice(0, 7)}</Typography>
              </Box>
              <Box mt={2}>
                <TagManager getValues={getValues} setValue={setValue} />
              </Box>
            </CardContent>
            <CardActions>
              <Button type='submit' color='secondary' variant='outlined'>
                Guardar
              </Button>
            </CardActions>
          </Card>
        </form>
      </Box>
    </Modal>
  );
};
