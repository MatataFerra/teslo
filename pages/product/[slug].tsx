import { useState, useContext, useEffect, useMemo } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { dbProducts } from "../../database";
import { ShopLayout } from "../../components/layouts";
import { Grid, Box, Typography, Chip } from "@mui/material";
import { CtaButtons, ProductSlideShow, SizeSelector } from "../../components/products";
import { ItemCounter } from "../../components/ui";
import { ICartProduct, ISize, IProductSize, ISizeStock } from "../../interfaces";
import { CartContext } from "../../context/";

interface Props {
  product: IProductSize;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const router = useRouter();
  const { addProductsToCart, cart } = useContext(CartContext);
  const [isBuying, setIsBuying] = useState(false);
  const [sizeSoldedOut, setSizeSoldedOut] = useState<(ISizeStock | undefined)[]>([]);

  const sizeMemorized = useMemo<ISize[]>(
    () =>
      product.sizes.map((s) => {
        return s.size;
      }),
    [product.sizes]
  );

  const sizeStockMemorized = useMemo<ISizeStock[]>(
    () =>
      product.sizes.map((s) => {
        return { ...s };
      }),
    [product.sizes]
  );

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 0,
  });

  useEffect(() => {
    cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size === undefined) return p;
      const sizeSoldedOut = product.sizes.find((s) => s.size === p.size?.size);

      if (p.size.size === sizeSoldedOut?.size) {
        setSizeSoldedOut((currentSizes) => {
          if (currentSizes.find((s) => s?.size === sizeSoldedOut.size)) return currentSizes;
          return [...currentSizes, p.size];
        });
      }

      return p;
    });
  }, [cart, product]);

  const handleSizeSelected = (size: ISize) => {
    const productSize = product.sizes.find((s) => s.size === size);

    if (productSize === undefined) return;

    const sizeStock: ISizeStock = {
      ...productSize,
      sizeRestStock: tempCartProduct.quantity === 0 ? productSize.stock : productSize.stock - tempCartProduct.quantity,
      size,
    };
    setTempCartProduct({ ...tempCartProduct, size: sizeStock });
  };

  const handleStock = (stock: number, productQuantity: number) => {
    if (!tempCartProduct.size) return setTempCartProduct({ ...tempCartProduct, quantity: productQuantity });

    setTempCartProduct({
      ...tempCartProduct,
      quantity: productQuantity,
      size: {
        ...tempCartProduct.size,
        sizeRestStock: stock,
      },
    });
  };

  const handleAddProductToCart = async () => {
    if (!tempCartProduct.size) return;
    if (tempCartProduct.quantity === 0) return;
    addProductsToCart(tempCartProduct);
    router.push("/cart");
  };

  const handleBuyNow = async () => {
    if (!tempCartProduct.size) return;
    if (tempCartProduct.quantity === 0) return;
    addProductsToCart(tempCartProduct);
    setIsBuying(true);
    router.push("/checkout/summary");
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            <Typography variant='h1' component='h1'>
              {product.title}
            </Typography>
            <Typography variant='subtitle1' component='h2'>
              {`$${product.price}`}
            </Typography>

            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              <ItemCounter
                quantity={tempCartProduct.quantity}
                sizeSelected={tempCartProduct?.size?.size}
                sizeStock={tempCartProduct.size}
                onStock={handleStock}
              />
              <SizeSelector
                sizes={sizeMemorized}
                selectedSize={tempCartProduct.size}
                setSizeSelected={handleSizeSelected}
                sizeSoldOut={sizeSoldedOut}
                sizeMemorized={sizeStockMemorized}
              />
            </Box>
            {product.inStock === 0 ? (
              <Chip label='No hay stock de este artículo' color='error' variant='outlined' />
            ) : (
              <CtaButtons
                product={tempCartProduct}
                disableAddToCart={isBuying}
                handleAddProductToCart={handleAddProductToCart}
                handleBuyNow={handleBuyNow}
              />
            )}

            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2'>Descripción</Typography>
              <Typography variant='body2'> {product.description} </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await dbProducts.getAllProductsBySlug(); // your fetch function here

  return {
    paths: slugs.map(({ slug }) => ({ params: { slug } })),
    fallback: "blocking",
  };
};

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

    revalidate: 1800,
  };
};

export default ProductPage;
