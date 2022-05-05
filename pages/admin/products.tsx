import { NextPage } from "next";
import NextLink from "next/link";

import { AdminLayout } from "../../components/layouts";
import { CategoryOutlined } from "@mui/icons-material";
import { Grid, CardMedia, Link } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { IProduct } from "../../interfaces";
import useSWR from "swr";

const columns: GridColDef[] = [
  {
    field: "img",
    headerName: "Foto",
    renderCell: ({ row }: GridValueGetterParams) => {
      return (
        <a href={`/products/${row.slug}`} target='_blank' rel='noopener noreferrer'>
          <CardMedia component='img' className='fadeIn' image={`/products/${row.img}`}></CardMedia>
        </a>
      );
    },
  },
  {
    field: "title",
    headerName: "Título del producto",
    width: 250,
    renderCell: ({ row }: GridValueGetterParams) => {
      return (
        <NextLink href={`/admin/products/${row.slug}`} passHref>
          <Link underline='always'>{row.title}</Link>
        </NextLink>
      );
    },
  },
  { field: "gender", headerName: "Género" },
  { field: "type", headerName: "Tipo" },
  { field: "inStock", headerName: "Inventario" },
  { field: "price", headerName: "Precio" },
  { field: "sizes", headerName: "Tallas", width: 250 },
];

const ProductsPage: NextPage = () => {
  const { data, error } = useSWR<IProduct[]>("/api/admin/products");

  if (!data && !error) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const rows = data!.map((product) => {
    return {
      id: product._id,
      img: product.images[0],
      title: product.title,
      gender: product.gender,
      type: product.type,
      inStock: product.inStock,
      price: product.price,
      sizes: product.sizes.join(", "),
      slug: product.slug,
    };
  });

  return (
    <AdminLayout
      title={`Productos (${data?.length ?? 0})`}
      subtitle={"Mantenimiento de órdenes"}
      icon={<CategoryOutlined />}>
      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default ProductsPage;
