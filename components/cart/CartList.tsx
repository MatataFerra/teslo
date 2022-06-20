import { Skeleton } from "@mui/material";
import { FC, useContext } from "react";
import { CartContext } from "../../context";
import { ICartProduct, IOrderItems } from "../../interfaces";
import { CartProduct, CartSkeleton } from "./";

interface Props {
  editable?: boolean;
  products?: IOrderItems[];
  isProcessing?: boolean;
}

export const CartList: FC<Props> = ({ editable = false, products, isProcessing = false }) => {
  const { cart } = useContext(CartContext);
  const cartLen = [...cart];
  const prodcutsToShow = products ?? cart;

  return (
    <>
      {!isProcessing
        ? prodcutsToShow.map((product) => (
            <CartProduct key={product.slug + product.size?.size} product={product} editable={editable} />
          ))
        : cartLen.map((c, i) => <CartSkeleton key={i} />)}
    </>
  );
};
