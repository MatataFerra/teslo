import { rest } from "msw";
import { productsMock } from "./productMock";

export const handlers = [
  rest.get("/api/products", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productsMock));
  }),
];
