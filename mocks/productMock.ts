import { IProduct } from "../interfaces";
import { IProductSize } from "../interfaces/products";
import { v4 as uuid } from "uuid";

export const productsMock: IProduct[] = [
  {
    _id: "1",
    description: "description",
    images: ["https://via.placeholder.com/300"],
    inStock: 1,
    price: 100,
    sizes: ["S", "M", "L"],
    slug: "slug",
    tags: ["tag"],
    title: "title",
    type: "shirts",
    gender: "men",
    createdAt: "today",
    updatedAt: "today",
  },
];

export const productSizeMock: IProductSize[] = [
  {
    _id: "1",
    description: "description",
    images: ["https://via.placeholder.com/300", "https://via.placeholder.com/150"],
    inStock: 9, // sizes.reduce((acc, size) => acc + size.stock, 0),
    price: 100,
    sizes: [
      {
        stock: 4,
        size: "S",
      },
      {
        stock: 5,
        size: "M",
      },
    ],
    slug: uuid().toString(),
    tags: ["tag"],
    title: "title",
    type: "shirts",
    gender: "men",
    createdAt: "today",
    updatedAt: "today",
  },
];
