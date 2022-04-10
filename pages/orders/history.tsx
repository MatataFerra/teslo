import { NextPage } from "next";
import NextLink from "next/link";
import { ShopLayout } from "../../components/layouts";
import { Typography, Grid, Chip, Link } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },

  {
    field: "fullname",
    headerName: "Nombre completo",
    width: 300,
  },
  {
    field: "paid",
    headerName: "Pagado",
    description: "Muestra la orden si fue pagada o no",
    width: 200,
    renderCell: (params: GridValueGetterParams) => {
      return params.row.paid ? (
        <Chip label="Pagado" color="success" variant="outlined" />
      ) : (
        <Chip label="Pendiente" color="error" variant="outlined" />
      );
    },
  },
  {
    field: "link",
    headerName: "Orden",
    width: 200,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} passHref>
          <Link underline="hover">Ver orden</Link>
        </NextLink>
      );
    },
  },
];

const rows = [
  { id: 1, paid: false, fullname: "Juan Perez" },
  { id: 2, paid: true, fullname: "Pedro Perez" },
  { id: 3, paid: false, fullname: "Juan Perez" },
  { id: 4, paid: false, fullname: "Hermindo Flores" },
  { id: 5, paid: true, fullname: "Juan Perez" },
];

const HistoryPage: NextPage = () => {
  return (
    <ShopLayout
      title="Historial de ordenes"
      pageDescription="Historial de ordenes"
    >
      <Typography variant="h1" component="h1">
        Historial de ordenes
      </Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;
