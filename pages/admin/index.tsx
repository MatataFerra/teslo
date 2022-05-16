import { useEffect, useState } from "react";
import { NextPage } from "next";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import { Grid } from "@mui/material";
import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined,
} from "@mui/icons-material";
import useSWR from "swr";
import { AdminLayout } from "../../components/layouts";
import { SummaryTile } from "../../components/admin";
import { DashboardSummaryResponse } from "../../interfaces";
import { FullScreenLoading, ErrorComponent } from "../../components/ui";

const iconFontSize: number = 30;

const DashboardPage: NextPage = () => {
  const { data, error } = useSWR<DashboardSummaryResponse>("/api/admin/dashboard", {
    refreshInterval: 30 * 1000,
  });

  const [refreshIn, setRefreshIn] = useState(Math.floor(Math.random() * 30));

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!data && !error) return <FullScreenLoading />;
  if (error) return <ErrorComponent />;

  const {
    numberOfOrders,
    numberOfClients,
    numberOfProducts,
    paidOrders,
    notPaidOrders,
    productsWithNoInventory,
    lowInventory,
  } = data!;

  return (
    <AdminLayout title='Admin' subtitle='Estadísticas generales' icon={<QueryStatsOutlinedIcon />}>
      <Grid container spacing={3}>
        <SummaryTile
          title={numberOfOrders}
          subtitle='Órdenes completadas'
          Icon={<CreditCardOffOutlined color='secondary' sx={{ fontSize: iconFontSize }} />}
          route='/admin/orders'
        />

        <SummaryTile
          title={paidOrders}
          subtitle='Órdenes pagadas'
          Icon={<AttachMoneyOutlined color='success' sx={{ fontSize: iconFontSize }} />}
        />

        <SummaryTile
          title={notPaidOrders}
          subtitle='Órdenes pendientes'
          Icon={<CreditCardOffOutlined color='error' sx={{ fontSize: iconFontSize }} />}
        />

        <SummaryTile
          title={numberOfClients}
          subtitle='Clientes'
          Icon={<GroupOutlined color='primary' sx={{ fontSize: iconFontSize }} />}
          route='/admin/users'
        />

        <SummaryTile
          title={numberOfProducts}
          subtitle='Productos'
          Icon={<CategoryOutlined color='warning' sx={{ fontSize: iconFontSize }} />}
          route='/admin/products'
        />

        <SummaryTile
          title={productsWithNoInventory}
          subtitle='Productos sin stock'
          Icon={<CancelPresentationOutlined color='error' sx={{ fontSize: iconFontSize }} />}
        />

        <SummaryTile
          title={lowInventory}
          subtitle='Bajo inventario'
          Icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: iconFontSize }} />}
        />

        <SummaryTile
          title={refreshIn}
          subtitle='Actualización en:'
          Icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: iconFontSize }} />}
        />
      </Grid>
    </AdminLayout>
  );
};

export default DashboardPage;
