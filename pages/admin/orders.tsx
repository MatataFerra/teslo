import { NextPage } from "next";

import { AdminLayout } from "../../components/layouts";
import { ConfirmationNumberOutlined } from "@mui/icons-material";
import { Grid, Chip, Tooltip } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { IOrder, IUser } from "../../interfaces";
import useSWR from "swr";
import { date } from "../../utils";
import { ErrorComponent, FullScreenLoading } from "../../components/ui";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    resizable: true,
    renderCell: ({ row }: GridValueGetterParams) => {
      return (
        <Tooltip title={row.id}>
          <span> {row.id.length > 10 ? row.id.substring(0, 10) + "..." : row.id}</span>
        </Tooltip>
      );
    },
  },
  { field: "email", headerName: "Email", width: 250 },
  { field: "name", headerName: "Nombre completo", width: 200 },
  { field: "total", headerName: "Monto Total", width: 150 },
  {
    field: "isPaid",
    headerName: "Pagado",
    renderCell: ({ row }: GridValueGetterParams) => {
      return row.isPaid ? (
        <Chip variant='outlined' label='Pagada' color='success' />
      ) : (
        <Chip variant='outlined' label='Pendiente' color='warning' />
      );
    },

    width: 120,
  },
  { field: "numberOfItems", headerName: "Número de productos", align: "center" },

  {
    field: "check",
    headerName: "ver orden",
    renderCell: ({ row }: GridValueGetterParams) => {
      return (
        <a href={`/admin/orders/${row.id}`} target='_blank' rel='noreferrer'>
          Ver orden
        </a>
      );
    },
  },

  { field: "createdAt", headerName: "Órden creada el", align: "left", width: 300 },
];

const OrdersPage: NextPage = () => {
  const { data, error } = useSWR<IOrder[]>("/api/admin/orders");

  if (!data && !error) return <FullScreenLoading />;
  if (error) return <ErrorComponent />;

  const rows = data!.map((order) => {
    return {
      id: order._id,
      email: (order.user as IUser).email,
      name: (order.user as IUser).name,
      total: order.total,
      isPaid: order.isPaid,
      numberOfItems: order.numberOfItems,
      createdAt: date.getFormatDistanceToNow(order.createdAt ?? "2022-05-14T19:05:05.085+00:00"),
    };
  });

  return (
    <AdminLayout title={"Ordenes"} subtitle={"Mantenimiento de órdenes"} icon={<ConfirmationNumberOutlined />}>
      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default OrdersPage;
