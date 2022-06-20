import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { dbProducts } from "../../database";
import { IProductSize } from "../../interfaces";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { Typography, Box } from "@mui/material";

interface Props {
  products: IProductSize[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout title='Teslo - search' pageDescription='Encontrar los mejores productos'>
      <Typography variant='h1' component='h1'>
        Buscar Producto
      </Typography>
      {foundProducts ? (
        <Typography variant='h2' textTransform='capitalize'>
          Productos relacionados con: {query}
        </Typography>
      ) : (
        <Box mb={4}>
          <Typography variant='h2'> No se encontraron resultados </Typography>
          <Typography variant='h2' color='secondary' textTransform='capitalize'>
            término buscado: {query}
          </Typography>
        </Box>
      )}
      <ProductList products={products} />
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = params?.query?.toString();

  if (!query) return { redirect: { destination: "/", permanent: true } };

  const products = await dbProducts.getProductsByTerms(query);
  const foundProducts = products.length > 0;

  if (!foundProducts) {
    const allProducts = await dbProducts.getAllProducts();

    return {
      props: {
        products: allProducts,
        foundProducts,
        query,
      },
    };
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};

export default SearchPage;
