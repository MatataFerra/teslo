import React from "react";
import { render, fireEvent, waitFor, prettyDOM } from "@testing-library/react";
import { ProductList } from "../components/products";
import { productsMock } from "../mocks";
import ProductPage from "../pages/product/[slug]";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));

describe("ProductList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRouter.setCurrentUrl("/initial");
  });

  test("should render correctly", () => {
    const { asFragment } = render(<ProductList products={productsMock} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render correctly with no products", () => {
    const { asFragment } = render(<ProductList products={[]} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("Image should have the right link", () => {
    const { getByRole } = render(<ProductList products={productsMock} />);
    const product = getByRole("link");

    expect(product.getAttribute("href")).toEqual(`/product/${productsMock[0].slug}`);

    // expect("/product/slug").toBe(`/product/${productsMock[0].slug}`);
  });

  test("should render correctly with no products", () => {
    const { asFragment } = render(<ProductList products={[]} />);
    expect(asFragment()).toMatchSnapshot();
  });

  // test("should redirect to product slug when click on image", async () => {
  //   jest.spyOn(React, "useEffect").mockImplementation(() => {
  //     return;
  //   });

  //   const { getByTestId } = render(<ProductList products={productsMock} />);
  //   const { getByText } = render(<ProductPage product={productsMock[0]} />);
  //   const product = getByTestId("link-slug-product-card");
  //   const title = getByText(productsMock[0].title);

  //   fireEvent.click(product);

  //   expect(title).toBeInTheDocument();
  // });
});
