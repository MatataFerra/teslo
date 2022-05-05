import { IProduct } from "../interfaces";

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
