import { render, fireEvent, waitFor, prettyDOM } from "@testing-library/react";
import { ProductList } from "../components/products";
import { productsMock } from "../mocks";

describe("ProductList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render correctly", () => {
    const { asFragment } = render(<ProductList products={productsMock} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render correctly with no products", () => {
    const { asFragment } = render(<ProductList products={[]} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should redirect to slug when click on image", () => {
    const { getByRole } = render(<ProductList products={productsMock} />);
    const product = getByRole("link");

    expect(product.getAttribute("href")).toEqual(`/product/${productsMock[0].slug}`);

    // expect("/product/slug").toBe(`/product/${productsMock[0].slug}`);
  });
});
