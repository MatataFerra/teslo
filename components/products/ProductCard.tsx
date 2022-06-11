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
import { FC, useMemo, useState, useEffect, useContext } from "react";
import { IProductSize } from "../../interfaces";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import Cookies from "js-cookie";
import { WishlistContext } from "../../context";
import { FavoriteButton } from "./FavoriteButton";
import { useSession } from "next-auth/react";

interface Props {
  product: IProductSize;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [skeleton, setSkeleton] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistLoaded, setWishlistLoaded] = useState(false);
  const { wishlist } = useContext(WishlistContext);
  const data = useSession();

  useEffect(() => {
    product && setIsImageLoaded(true);
  }, [product]);

  useEffect(() => {
    if (wishlist && wishlist.length > 0 && wishlist.includes(product.slug)) {
      return setIsInWishlist(true);
    }
  }, [product.slug, wishlist]);

  useEffect(() => {
    if (data.data?.user?.email) {
      isImageLoaded &&
        wishlist.length > 0 &&
        setTimeout(() => {
          setWishlistLoaded(true);
        }, 1000);
      return;
    }

    setWishlistLoaded(true);
  }, [data.data?.user?.email, isImageLoaded, wishlist.length]);

  const productImage = useMemo(() => {
    return isHovered ? `${product.images[1]}` : `${product.images[0]}`;
  }, [isHovered, product.images]);

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
        {!wishlistLoaded ? (
          <Skeleton
            variant='circular'
            width={30}
            height={30}
            sx={{ position: "absolute", zIndex: 99, top: 10, right: 10 }}
          />
        ) : (
          <FavoriteButton isInWishlist={isInWishlist} product={product} setIsInWishlist={setIsInWishlist} />
        )}
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
