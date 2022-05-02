import { render, screen, prettyDOM } from "@testing-library/react";
import { server } from "../mocks/server";
import mockRouter from "next-router-mock";
const { MongoClient } = require("mongodb");

import ProductPage, { getStaticProps } from "@/pages/product/[slug]";
import { productsMock } from "../mocks/productMock";

let loading = false;

jest.mock("next/dist/client/router", () => require("next-router-mock"));
jest.mock("mongoose", () => ({
  connect: jest.fn(),
}));

// mock a model
jest.mock("../models/Product", () => ({
  findOne: jest.fn(() => Promise.resolve("")),
}));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Test render home", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/initial");
    jest.mock("../hooks/useProducts", () => ({
      useProducts: () => ({
        products: productsMock,
        isLoading: loading,
        isError: false,
      }),
    }));
  });

  test("renders a heading", async () => {
    render(<ProductPage product={productsMock[0]} />);

    const resp = await getStaticProps({ params: { slug: "slug" } } as any);
    console.log(resp);

    expect(screen.getByText(productsMock[0].title)).toBeInTheDocument();
  });
});
