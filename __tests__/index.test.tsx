import { render, screen } from "@testing-library/react";
import { server } from "../mocks/server";
import mockRouter from "next-router-mock";

import Home from "@/pages/index";
import { ProductList } from "@/components/products";
import { productsMock } from "../mocks/productMock";

let loading = false;

jest.mock("next/dist/client/router", () => require("next-router-mock"));

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

  test("renders a heading", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: /tienda/i })).toBeInTheDocument();
  });

  test("renders a loading indicator if loading of useProduct is true", () => {
    loading = true;
    const { getByRole } = render(<Home />);

    expect(getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders a product list", () => {
    render(<ProductList products={productsMock} />);
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
  });
});
