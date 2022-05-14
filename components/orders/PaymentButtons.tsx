import { FC } from "react";
import { CreditScoreOutlined } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { PayPalButtons } from "@paypal/react-paypal-js";

type OrderResponseBody = {
  id: string;
  status: "COMPLETED" | "SAVED" | "APPROVED" | "VOIDED" | "COMPLETED" | "PAYER_ACTION_REQUIRED";
};

interface Props {
  isPaid: boolean;
  total: number;
  onOrderCompleted: (details: OrderResponseBody) => Promise<void>;
}

export const PaymentButtonsStatus: FC<Props> = ({ isPaid, onOrderCompleted, total }) => {
  return (
    <>
      {isPaid ? (
        <Chip
          sx={{ my: 2, flex: 1 }}
          label='Orden ya fue pagada'
          color='success'
          variant='outlined'
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: total.toString(),
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order!.capture().then((details) => {
              onOrderCompleted(details);
            });
          }}
        />
      )}
    </>
  );
};
