import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Cookies from "js-cookie";
import { Dispatch, FC, SetStateAction, useContext } from "react";
import { WishlistContext } from "../../context";
import { IProductSize } from "../../interfaces";

interface Props {
  isInWishlist: boolean;
  setIsInWishlist: Dispatch<SetStateAction<boolean>>;
  product: IProductSize;
}

export const FavoriteButton: FC<Props> = ({ isInWishlist, setIsInWishlist, product }) => {
  const { addToWishlist } = useContext(WishlistContext);

  const onWishlist = async () => {
    addToWishlist(product);
    setIsInWishlist((prev) => !prev);
  };

  return (
    <>
      <IconButton sx={{ position: "absolute", zIndex: 99, top: 10, right: 10 }} onClick={onWishlist}>
        {isInWishlist ? <Favorite color='error' /> : <FavoriteBorder sx={{ transition: ".3s ease all" }} />}
      </IconButton>
    </>
  );
};
