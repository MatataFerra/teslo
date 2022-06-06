import { NextPage } from "next";
import { AdminLayout } from "../../components/layouts";
import { ConfirmationNumberOutlined } from "@mui/icons-material";
import { Grid, Chip, Tooltip, MenuItem, Select } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import axios from "axios";
import { IOrder, IUser, OrderStatusEnum, OrderStatus, IOrderStatus } from "../../interfaces";
import useSWR from "swr";
import { date, mapOrdersAddStatus, mapOrdersAddStatusById } from "../../utils";
import { ErrorComponent, FullScreenLoading } from "../../components/ui";
import { tesloApi } from "../../api";
import { useEffect, useState } from "react";
import { OrderItemStatus } from "../../components/admin";

export interface ValidStatus {
  status: OrderStatus;
  label: string;
}

const validStatus: ValidStatus[] = [
  {
    status: OrderStatusEnum.pending,
    label: "Pendiente",
  },

  {
    status: OrderStatusEnum.processing,
    label: "En proceso",
  },

  {
    status: OrderStatusEnum.shipped,
    label: "Enviado",
  },

  {
    status: OrderStatusEnum.delivered,
    label: "Entregado",
  },

  {
    status: OrderStatusEnum.cancelled,
    label: "Cancelado",
  },
];

const OrdersPage: NextPage = () => {
  const { data, error } = useSWR<IOrder[]>("/api/admin/orders");
  const [dataFromApi, setDataFromApi] = useState<IOrderStatus[]>([]);

  useEffect(() => {
    if (data) {
      setDataFromApi(
        mapOrdersAddStatus(data, {
          loading: 0,
          error: false,
        })
      );
    }
  }, [data]);

  if (dataFromApi.length === 0 && !error) return <FullScreenLoading />;
  if (error) return <ErrorComponent />;

  const onStatusUpdate = async (orderId: string, newRole: string) => {
    try {
      await tesloApi.put(`/admin/orders/${orderId}`, { status: newRole });
      setDataFromApi(
        mapOrdersAddStatusById(
          dataFromApi,
          {
            loading: 1,
            error: false,
          },
          orderId
        )
      );
    } catch (error) {
      setDataFromApi(
        mapOrdersAddStatusById(
          dataFromApi,
          {
            loading: 0,
            error: true,
          },
          orderId
        )
      );

      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      }
    }
    return null;
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
            {validStatus.map((status) => (
              <MenuItem key={status.status} value={status.status}>
                <OrderItemStatus
                  status={status.label}
                  opacityLoader={row.loadingStatus.loading}
                  orderError={row.loadingStatus.error}
                />
              </MenuItem>
            ))}
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

  const rows = dataFromApi!.map((order) => {
    return {
      id: order._id,
      email: (order.user as IUser).email,
      name: (order.user as IUser).name,
      total: order.total,
      isPaid: order.isPaid,
      numberOfItems: order.numberOfItems,
      status: order.status,
      loadingStatus: order.loadingStatus,
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
