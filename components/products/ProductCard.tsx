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
} from "@mui/material";
import { FC, useMemo, useState, useEffect, useContext } from "react";
import NextLink from "next/link";
import { IProduct } from "../../interfaces";

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [skeleton, setSkeleton] = useState(false);

  useEffect(() => {
    product && setIsImageLoaded(true);
  }, [product]);

  const productImage = useMemo(() => {
    return isHovered
      ? `/products/${product.images[1]}`
      : `/products/${product.images[0]}`;
  }, [isHovered, product.images]);

  return (
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
          <Link>
            <CardActionArea>
              {product.inStock === 0 && (
                <Chip
                  color="primary"
                  label="No hay en stock"
                  sx={{ position: "absolute", zIndex: 99, top: 10, left: 10 }}
                />
              )}
              {isImageLoaded ? (
                <CardMedia
                  component={"img"}
                  image={productImage}
                  alt={product.title}
                  className="fadeIn"
                  onLoad={() => setSkeleton(true)}
                />
              ) : (
                <Skeleton variant="rectangular" width="100%" height="400px" />
              )}
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>

      <Box sx={{ mt: 1 }} className="fadeIn">
        {skeleton ? (
          <>
            <Typography fontWeight={700}> {product.title} </Typography>
            <Typography fontWeight={500}> {` $${product.price} `} </Typography>
          </>
        ) : (
          <>
            <Skeleton variant="text" width="70%" height="20px" />
            <Skeleton variant="text" width="10%" height="20px" />
          </>
        )}
      </Box>
    </Grid>
  );
};
