import { useState, useContext, useEffect, useMemo } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { dbProducts } from "../../database";
import { ShopLayout } from "../../components/layouts";
import { Grid, Box, Typography, Button, Chip } from "@mui/material";
import { ProductSlideShow, SizeSelector } from "../../components/products";
import { ItemCounter } from "../../components/ui";
import { ICartProduct, IProduct } from "../../interfaces";
import { ISize } from "../../interfaces/products";
import { CartContext } from "../../context/";

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const router = useRouter();
  const { addProductsToCart, cart } = useContext(CartContext);
  const [sizeSoldedOut, setSizeSoldedOut] = useState<(ISize | undefined)[]>([]);

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    images: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
    productStock: product.inStock,
    restStock: product.inStock,
  });

  useEffect(() => {
    cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size === undefined) return p;
      const sizeSoldedOut = product.sizes.find((s) => s === p.size);
      if (p.restStock === 0 && p.size === sizeSoldedOut) {
        setSizeSoldedOut((currentSizes) => {
          if (currentSizes.find((s) => s === sizeSoldedOut))
            return currentSizes;
          return [...currentSizes, p.size];
        });
      }

      return p;
    });
  }, [cart, product]);

  const handleSizeSelected = (size: ISize) => {
    setTempCartProduct({ ...tempCartProduct, size });
  };

  const handleStock = (stock: number, productQuantity: number) => {
    setTempCartProduct({
      ...tempCartProduct,
      quantity: productQuantity,
      restStock: stock,
    });
  };

  const handleAddProductToCart = () => {
    if (!tempCartProduct.size) return;
    addProductsToCart(tempCartProduct);
    router.push("/cart");
  };

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
              <ItemCounter
                quantity={tempCartProduct.quantity}
                inStock={tempCartProduct.productStock}
                restStock={tempCartProduct.restStock}
                onStock={handleStock}
              />
              <SizeSelector
                sizes={product.sizes}
                selectedSize={tempCartProduct.size}
                setSizeSelected={handleSizeSelected}
                sizeSoldOut={sizeSoldedOut}
              />
            </Box>
            {product.inStock === 0 ? (
              <Chip
                label="No hay stock de este artículo"
                color="error"
                variant="outlined"
              />
            ) : (
              <Button
                color="secondary"
                className="circular-btn"
                disabled={!!!tempCartProduct.size}
                onClick={handleAddProductToCart}
              >
                {tempCartProduct.size
                  ? "Agregar al carrito"
                  : "Seleccione un tamaño"}
              </Button>
            )}

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
