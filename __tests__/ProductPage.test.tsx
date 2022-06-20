import React from "react";
import { fireEvent, render, prettyDOM, waitFor } from "@testing-library/react";
import { productsMock } from "../mocks";
import ProductPage from "../pages/product/[slug]";
import mockRouter from "next-router-mock";
import { SizeSelector } from "../components/products/";
import { ItemCounter } from "../components/ui/ItemCounter";

jest.mock("next/router", () => require("next-router-mock"));
mockRouter.pathname = "/product/slug";

describe("Product Page", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/initial");
    jest.clearAllMocks();
  });
  test("Should render product title", async () => {
    jest.spyOn(React, "useEffect").mockImplementation(() => {
      return;
    });
    const { getByText } = render(<ProductPage product={productsMock[0]} />);
    const title = getByText(productsMock[0].title);
    expect(title).toBeInTheDocument();
  });

  test("Should render product description", async () => {
    jest.spyOn(React, "useEffect").mockImplementation(() => {
      return;
    });
    const { getByText } = render(<ProductPage product={productsMock[0]} />);
    const description = getByText(productsMock[0].description);
    expect(description).toBeInTheDocument();
  });

  test("Should select a size", async () => {
    const addToCart = jest.fn();
    const { getByText } = render(
      <SizeSelector sizes={productsMock[0].sizes} setSizeSelected={addToCart} sizeSoldOut={[]} />
    );
    const sizeSmall = getByText("S");
    fireEvent.click(sizeSmall);
    expect(addToCart).toHaveBeenCalled();
  });

  test("Should change the button's text by selected a size", () => {
    jest.spyOn(React, "useEffect").mockImplementation(() => {
      return;
    });
    const { getByText } = render(<ProductPage product={productsMock[0]} />);

    const sizeSmall = getByText("S");
    fireEvent.click(sizeSmall);
    const addToCartText = getByText("Agregar al carrito");
    expect(addToCartText).toBeInTheDocument();
  });

  // test("Should add an item to cart", () => {
  //   jest.spyOn(React, "useEffect").mockImplementation(() => {
  //     return;
  //   });
  //   const addToCart = jest.fn((stock: number, productQuantity: number) => {
  //     return stock + productQuantity;
  //   });

  //   const { getByText, getByTestId } = render(
  //     <ItemCounter quantity={1} inStock={0} restStock={0} onStock={addToCart} />
  //   );

  //   const quantityPlus = getByTestId("item-counter-add");
  //   fireEvent.click(quantityPlus);
  //   const quantity = getByText("1");

  //   expect(quantityPlus).toHaveBeenCalled();
  //   expect(quantity).toHaveTextContent("2");
  // });
});
