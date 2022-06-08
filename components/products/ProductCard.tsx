import NextLink from "next/link";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
  Link,
  Skeleton,
  Chip,
  IconButton,
} from "@mui/material";
import { FC, useMemo, useState, useEffect } from "react";
import { IProductSize } from "../../interfaces";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import Cookies from "js-cookie";

interface Props {
  product: IProductSize;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [skeleton, setSkeleton] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const cookie = Cookies.get("wishlist") ?? null;
    if (!cookie) return;
    const cookiesParsed: string[] = JSON.parse(cookie) ?? [];

    if (cookiesParsed.includes(product.slug)) {
      return setIsInWishlist(true);
    }
  }, [product.slug]);

  useEffect(() => {
    product && setIsImageLoaded(true);
  }, [product]);

  const productImage = useMemo(() => {
    return isHovered ? `${product.images[1]}` : `${product.images[0]}`;
  }, [isHovered, product.images]);

  const onWishlist = async () => {
    setIsInWishlist((prev) => !prev);
    const wishlistedProducts = Cookies.get("wishlist");
    const wishlist = wishlistedProducts ? JSON.parse(wishlistedProducts) : [];
    const productExists = wishlist.find((p: any) => p === product.slug);

    if (productExists) {
      const newWishlist = wishlist.filter((p: any) => p !== product.slug);
      Cookies.set("wishlist", JSON.stringify([...newWishlist]));
      return;
    }

    Cookies.set("wishlist", JSON.stringify([...wishlist, product.slug]));
  };

  return (
    <Grid item xs={6} sm={4} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Card sx={{ position: "relative" }}>
        <CardActionArea>
          {product.inStock === 0 && (
            <Chip
              color='primary'
              label='No hay en stock'
              sx={{ position: "absolute", zIndex: 99, top: 10, left: 10 }}
            />
          )}
          {isImageLoaded ? (
            <>
              <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
                <Link role='link' data-testid='link-slug-product-card'>
                  <CardMedia
                    component={"img"}
                    image={productImage}
                    alt={product.title}
                    className='fadeIn'
                    onLoad={() => setSkeleton(true)}
                  />
                </Link>
              </NextLink>
            </>
          ) : (
            <Skeleton variant='rectangular' width='100%' height='400px' />
          )}
        </CardActionArea>
        <IconButton sx={{ position: "absolute", zIndex: 99, top: 10, right: 10 }} onClick={onWishlist}>
          {isInWishlist ? <Favorite color='error' /> : <FavoriteBorder sx={{ transition: ".3s ease all" }} />}
        </IconButton>
      </Card>

      <Box sx={{ mt: 1 }} className='fadeIn'>
        {skeleton ? (
          <>
            <Typography fontWeight={700}> {product.title} </Typography>
            <Typography fontWeight={500}> {` $${product.price} `} </Typography>
          </>
        ) : (
          <>
            <Skeleton variant='text' width='70%' height='20px' />
            <Skeleton variant='text' width='10%' height='20px' />
          </>
        )}
      </Box>
    </Grid>
  );
};
