import { GetStaticPaths, GetStaticProps } from "next";
import { dbProducts } from "../../database";
import { NextPage } from "next";
import { ShopLayout } from "../../components/layouts";
import { Grid, Box, Typography, Button } from "@mui/material";
import { ProductSlideShow, SizeSelector } from "../../components/products";
import { ItemCounter } from "../../components/ui";
import { IProduct } from "../../interfaces";

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  // const router =  useRouter();
  // const { products: product, isLoading } = useProducts(`/products/${router.query.slug}`);

  // if(isLoading) return <p>Loading...</p>;

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              {`$${product.price}`}
            </Typography>

            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ItemCounter />
              <SizeSelector sizes={product.sizes} />
            </Box>

            <Button color="secondary" className="circular-btn">
              Agregar al carrito
            </Button>

            {/* <Chip label="No hay disponibles" color="error" variant="outlined" /> */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripción</Typography>
              <Typography variant="body2"> {product.description} </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { slug } = ctx.query as { slug: string };

//   const product = await dbProducts.getProductsBySlug(slug);

//   if (!product) {
//     return {
//       redirect: {
//         statusCode: 404,
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       product,
//     },
//   };
// };

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const slugs = await dbProducts.getAllProductsBySlug(); // your fetch function here

  return {
    paths: slugs.map(({ slug }) => ({ params: { slug } })),
    fallback: "blocking",
  };
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as { slug: string };

  const product = await dbProducts.getProductsBySlug(slug);

  if (!product) {
    return {
      redirect: {
        statusCode: 404,
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },

    revalidate: 86400,
  };
};

export default ProductPage;
