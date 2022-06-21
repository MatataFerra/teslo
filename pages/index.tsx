import { GetServerSideProps } from "next";
import type { NextPage } from "next";
import { Typography } from "@mui/material";
import { ShopLayout } from "../components/layouts";
import { ProductList } from "../components/products";
import { useProducts } from "../hooks";
import { FullScreenLoading } from "../components/ui";

const Home: NextPage = () => {
  const { products, isLoading } = useProducts("/products");

  return (
    <ShopLayout title='Teslo - shop' pageDescription='Encontrar los mejores productos'>
      <Typography variant='h1' component='h1'>
        Tienda
      </Typography>
      <Typography variant='h2'>Todos los productos</Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log("getServerSideProps", process.env.NEXTAUTH_URL);

  return {
    props: {},
  };
};

export default Home;
