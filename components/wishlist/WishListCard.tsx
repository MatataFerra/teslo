import { FC, SetStateAction } from "react";
import { Favorite } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  IconButton,
  Link,
  Skeleton,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { IProductSize } from "../../interfaces";
import Cookies from "js-cookie";
import { tesloApi } from "../../api";
import { useSession } from "next-auth/react";

interface Props {
  product?: IProductSize;
  isImageLoaded: boolean;
  skeleton: boolean;
  setWishlist: (value: SetStateAction<IProductSize[]>) => void;
}

export const WishListCard: FC<Props> = ({ isImageLoaded = true, skeleton = true, product, setWishlist }) => {
  const { status } = useSession();
  const onUnfavorite = async () => {
    if (status === "unauthenticated") return;

    const cookies = Cookies.get("wishlist");
    if (cookies) {
      const slugs = JSON.parse(cookies);
      const newSlugs = slugs.filter((item: string) => item !== product?.slug);
      Cookies.set("wishlist", JSON.stringify(newSlugs));
      setWishlist((prevState: IProductSize[]) => {
        return prevState.filter((item: IProductSize) => item.slug !== product?.slug);
      });
    }
  };

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ position: "relative" }}>
        <CardActionArea>
          {isImageLoaded ? (
            <>
              <NextLink href={`/product/${product?.slug}`} passHref prefetch={false}>
                <Link role='link'>
                  <CardMedia component={"img"} image={product?.images[0]} alt={product?.title} className='fadeIn' />
                </Link>
              </NextLink>
            </>
          ) : (
            <Skeleton variant='rectangular' width='100%' height='400px' />
          )}
        </CardActionArea>
        <IconButton sx={{ position: "absolute", zIndex: 99, top: 10, right: 10 }} onClick={onUnfavorite}>
          <Favorite color='error' />
        </IconButton>
      </Card>

      <Box sx={{ mt: 1 }} className='fadeIn'>
        {skeleton ? (
          <>
            <Typography fontWeight={700}> Título: {product?.title} </Typography>
            <Typography fontWeight={500} variant='caption'>
              Precio: ${product?.price}
            </Typography>
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
