import { NextPage } from "next";

import { AdminLayout } from "../../components/layouts";
import { ConfirmationNumberOutlined } from "@mui/icons-material";
import { Grid, Chip, Tooltip, MenuItem, TextField, Select } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { IOrder, IUser, OrderStatusEnum } from "../../interfaces";
import useSWR from "swr";
import { date } from "../../utils";
import { ErrorComponent, FullScreenLoading } from "../../components/ui";

const OrdersPage: NextPage = () => {
  const { data, error } = useSWR<IOrder[]>("/api/admin/orders");

  if (!data && !error) return <FullScreenLoading />;
  if (error) return <ErrorComponent />;

  const onStatusUpdate = async (orderId: string, newRole: string) => {
    console.log({ orderId, newRole });
    return {
      orderId,
      role: newRole,
    };
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      renderCell: ({ row }: GridValueGetterParams) => {
        return (
          <Tooltip title={row.id}>
            <span> {row.id.length > 10 ? row.id.substring(0, 10) + "..." : row.id}</span>
          </Tooltip>
        );
      },
    },
    { field: "email", headerName: "Email" },
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

    {
      field: "status",
      headerName: "Estado de la oden",
      width: 250,
      renderCell: ({ row }: GridValueGetterParams) => {
        return (
          <Select
            value={row.status}
            name={row.status}
            onChange={(e) => onStatusUpdate(row.id, e.target.value)}
            sx={{ width: "100%", border: "none" }}>
            <MenuItem value={OrderStatusEnum.pending}> Pendiente </MenuItem>
            <MenuItem value={OrderStatusEnum.processing}>En Proceso</MenuItem>
            <MenuItem value={OrderStatusEnum.shipped}>Enviando</MenuItem>
            <MenuItem value={OrderStatusEnum.delivered}>Entregada</MenuItem>
            <MenuItem value={OrderStatusEnum.cancelled}>Cancelada</MenuItem>
          </Select>
        );
      },
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

  const rows = data!.map((order) => {
    return {
      id: order._id,
      email: (order.user as IUser).email,
      name: (order.user as IUser).name,
      total: order.total,
      isPaid: order.isPaid,
      numberOfItems: order.numberOfItems,
      status: order.status,
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
