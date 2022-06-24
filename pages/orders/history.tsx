import { useState } from "react";
import { NextPage, GetServerSideProps } from "next";
import NextLink from "next/link";
import { ShopLayout } from "../../components/layouts";
import { Typography, Grid, Chip, Link, IconButton, Tooltip } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { getSession } from "next-auth/react";
import { dbOrders } from "../../database";
import { IOrder, OrderStatus, OrderStatusEnum } from "../../interfaces";
import {
  BeenhereOutlined,
  BuildCircleOutlined,
  DeleteOutline,
  DoDisturbOnOutlined,
  LocalMallOutlined,
  LocalShippingOutlined,
} from "@mui/icons-material";
import { StatusOrderIcon } from "../../components/orders";
import { tesloApi } from "../../api";
import { ModalTransition } from "../../components/ui";

interface StatusIconsPros {
  [OrderStatusEnum.pending]: JSX.Element;
  [OrderStatusEnum.processing]: JSX.Element;
  [OrderStatusEnum.shipped]: JSX.Element;
  [OrderStatusEnum.delivered]: JSX.Element;
  [OrderStatusEnum.cancelled]: JSX.Element;
}

const statusIcons: StatusIconsPros = {
  [OrderStatusEnum.pending]: (
    <StatusOrderIcon icon={<LocalMallOutlined />} status='Recibimos tu orden con éxito!' textColor='#32cb64' />
  ),
  [OrderStatusEnum.processing]: (
    <StatusOrderIcon icon={<BuildCircleOutlined />} status='Estamos procesando tu orden' textColor='#3279cb' />
  ),
  [OrderStatusEnum.shipped]: (
    <StatusOrderIcon icon={<LocalShippingOutlined />} status='Tu orden está siendo enviada' textColor='#3262cb' />
  ),
  [OrderStatusEnum.delivered]: (
    <StatusOrderIcon icon={<BeenhereOutlined />} status='Tu orden ha sido entregada' textColor='#16ed45' />
  ),
  [OrderStatusEnum.cancelled]: (
    <StatusOrderIcon icon={<DoDisturbOnOutlined color='error' />} status='Cancelaste la orden' textColor='#cb3232' />
  ),
};

interface Props {
  orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
  const [updateOrders, setUpdateOrders] = useState<IOrder[]>(orders);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const changeModalState = (state: boolean) => {
    setIsModalOpen(state);
  };

  const onDeleteOrder = async (id: string, status: OrderStatus) => {
    changeModalState(true);
    if (status === "cancelled") {
      const { data: orders } = await tesloApi.put<IOrder>("/orders", { status, orderId: id });
      await tesloApi.put("/products/update", { orderId: id });

      if (orders) {
        const orderToUpdate = updateOrders.find((order) => order._id === orders._id);
        if (orderToUpdate) {
          orderToUpdate.status = orders.status;
          setUpdateOrders([...updateOrders]);
        }

        changeModalState(false);
      }
    }

    return null;
  };

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
          <Chip label='Pagado' color='success' variant='outlined' />
        ) : (
          <Chip label='Pendiente' color='error' variant='outlined' />
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
          <NextLink href={`/orders/${params.row.orderId}`} passHref>
            <Link underline='hover'>Ver orden</Link>
          </NextLink>
        );
      },
    },
    {
      field: "info",
      headerName: "Información",
      description: "Muestra la información de la orden",
      width: 250,
      renderCell: (params: GridValueGetterParams) => {
        return statusIcons[params.row.status as OrderStatusEnum] as StatusIconsPros[OrderStatusEnum];
      },
    },
    {
      field: "actions",
      headerName: "Acciones",
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridValueGetterParams) => {
        return (
          <>
            <IconButton
              disabled={params.row.status === OrderStatusEnum.cancelled}
              onClick={() => onDeleteOrder(params.row.orderId, "cancelled")}>
              <Tooltip title='Cancelá la órden' placement='top' arrow>
                <DeleteOutline />
              </Tooltip>
            </IconButton>
          </>
        );
      },
    },
  ];

  const rows = updateOrders.map((order, i) => {
    return {
      id: i + 1,
      paid: order.isPaid,
      fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
      orderId: order._id,
      status: order.status,
    };
  });
  return (
    <ShopLayout title='Historial de ordenes' pageDescription='Historial de ordenes'>
      <Typography variant='h1' component='h1'>
        Historial de ordenes
      </Typography>

      <ModalTransition
        isOpen={isModalOpen}
        onClose={() => changeModalState(isModalOpen)}
        message='Cancelando la orden'
      />

      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req });

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/auth/login?p=/orders/history",
  //       permanent: false,
  //     },
  //   };
  // }

  // if (!session.user.active) {
  //   return {
  //     redirect: {
  //       destination: `/`,
  //       permanent: false,
  //     },
  //   };
  // }

  const orders = await dbOrders.getOrdersByUserId(session.user._id);

  return {
    props: {
      orders,
    },
  };
};

export default HistoryPage;
