import { Typography } from "@mui/material";
import { NextPage } from "next";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { FullScreenLoading } from "../../components/ui";
import { useProducts } from "../../hooks";

const KidPage: NextPage = () => {
  const { products, isLoading } = useProducts("/products?gender=kid");

  return (
    <ShopLayout
      title="Teslo - shop"
      pageDescription="Encontrar los mejores productos de niños"
    >
      <Typography variant="h1" component="h1">
        Niños
      </Typography>
      <Typography variant="h2">Productos para niños</Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default KidPage;
