import { NextPage } from "next";
import NextLink from "next/link";

import { AdminLayout } from "../../components/layouts";
import { AddOutlined, CategoryOutlined } from "@mui/icons-material";
import { Grid, CardMedia, Link, Box, Button, Tooltip } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { IProductSize, ISizeStock, ISize } from "../../interfaces";
import useSWR from "swr";
import { ErrorComponent, FullScreenLoading } from "../../components/ui";

enum ValidSize {
  XS = "XS",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
  XXXL = "XXXL",
}

const parseSize = (sizes: ISizeStock[], validSize: ISize = "S") => {
  return sizes
    .filter((m: any) => m.size === validSize)
    .map((size: any) => {
      const stock = `${size.stock}`;
      return stock;
    });
};

const columns: GridColDef[] = [
  {
    field: "img",
    headerName: "Foto",
    renderCell: ({ row }: GridValueGetterParams) => {
      return (
        <a href={`/product/${row.slug}`} target='_blank' rel='noopener noreferrer'>
          <Tooltip title='Ver producto' arrow placement='right'>
            <CardMedia component='img' className='fadeIn' image={row.img} />
          </Tooltip>
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
          <Tooltip title='Editar producto' arrow placement='right'>
            <Link underline='always'>{row.title}</Link>
          </Tooltip>
        </NextLink>
      );
    },
  },
  { field: "gender", headerName: "Género" },
  { field: "type", headerName: "Tipo" },
  { field: "inStock", headerName: "Inventario" },
  { field: "price", headerName: "Precio" },
  {
    field: "xs",
    headerName: ValidSize.XS,
    width: 75,
    renderCell: ({ row }: GridValueGetterParams) => {
      return !row.xs.length ? "-" : row.xs;
    },
  },

  {
    field: "s",
    headerName: ValidSize.S,
    width: 75,
    renderCell: ({ row }: GridValueGetterParams) => {
      return !row.s.length ? "-" : row.s;
    },
  },

  {
    field: "m",
    headerName: ValidSize.M,
    width: 75,
    renderCell: ({ row }: GridValueGetterParams) => {
      return !row.m.length ? "-" : row.m;
    },
  },

  {
    field: "l",
    headerName: ValidSize.L,
    width: 75,
    renderCell: ({ row }: GridValueGetterParams) => {
      return !row.l.length ? "-" : row.l;
    },
  },

  {
    field: "xl",
    headerName: ValidSize.XL,
    width: 75,
    renderCell: ({ row }: GridValueGetterParams) => {
      return !row.xl.length ? "-" : row.xl;
    },
  },

  {
    field: "xxl",
    headerName: ValidSize.XXL,
    width: 75,
    renderCell: ({ row }: GridValueGetterParams) => {
      return !row.xxl.length ? "-" : row.xxl;
    },
  },

  {
    field: "xxxl",
    headerName: ValidSize.XXXL,
    width: 75,
    renderCell: ({ row }: GridValueGetterParams) => {
      return !row.xxxl.length ? "-" : row.xxxl;
    },
  },
];

const ProductsPage: NextPage = () => {
  const { data, error } = useSWR<IProductSize[]>("/api/admin/products");

  if (!data && !error) return <FullScreenLoading />;
  if (error) return <ErrorComponent />;

  const rows = data!.map((product) => {
    return {
      id: product._id,
      img: product.images[0],
      title: product.title,
      gender: product.gender,
      type: product.type,
      inStock: product.sizes.reduce((acc, curr) => acc + curr.stock, 0),
      price: product.price,
      xs: parseSize(product.sizes, ValidSize.XS),
      s: parseSize(product.sizes, ValidSize.S),
      m: parseSize(product.sizes, ValidSize.M),
      l: parseSize(product.sizes, ValidSize.L),
      xl: parseSize(product.sizes, ValidSize.XL),
      xxl: parseSize(product.sizes, ValidSize.XXL),
      xxxl: parseSize(product.sizes, ValidSize.XXXL),
      slug: product.slug,
    };
  });

  return (
    <AdminLayout
      title={`Productos (${data?.length ?? 0})`}
      subtitle={"Mantenimiento de órdenes"}
      icon={<CategoryOutlined />}
      back>
      <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
        <Button startIcon={<AddOutlined />} variant='contained' color='primary' href='/admin/products/new'>
          Nuevo producto
        </Button>
      </Box>

      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default ProductsPage;
