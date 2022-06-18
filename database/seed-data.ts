import bcrypt from "bcryptjs";
import { IGender, IType } from "../interfaces";

interface SeedProduct {
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ValidSizes[];
  slug: string;
  tags: string[];
  title: string;
  type: ValidTypes;
  gender: "men" | "women" | "kid" | "unisex";
}

interface SeedProductSize {
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: SeedSize[];
  slug: string;
  tags: string[];
  title: string;
  type: IType;
  gender: IGender;
}

interface SeedUser {
  name: string;
  email: string;
  password: string;
  role: "client" | "admin";
  active: boolean;
}

interface SeedSize {
  stock: number;
  size: ValidSizes;
}

interface SeedPickup {
  name: string;
  latitude: string;
  longitude: string;
}

type ValidSizes = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
type ValidTypes = "shirts" | "pants" | "hoodies" | "hats";

interface SeedData {
  users: SeedUser[];
  productSizes: SeedProductSize[];
  pickups: SeedPickup[];
}

export const initialData: SeedData = {
  users: [
    {
      name: "Matata Ferra",
      email: "matata@mail.com",
      password: bcrypt.hashSync("123456"),
      role: "admin",
      active: true,
    },

    {
      name: "Nati Belén",
      email: "nati@mail.com",
      password: bcrypt.hashSync("123456"),
      role: "client",
      active: true,
    },
  ],

  productSizes: [
    {
      description:
        "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
      images: ["1740176-00-A_0_2000.jpg", "1740176-00-A_1.jpg"],
      inStock: 21,
      price: 75,
      sizes: [
        {
          size: "XS",
          stock: 7,
        },
        {
          size: "S",
          stock: 7,
        },

        {
          size: "M",
          stock: 7,
        },
      ],
      slug: "mens_chill_crew_neck_sweatshirt",
      type: "shirts",
      tags: ["sweatshirt"],
      title: "Men’s Chill Crew Neck Sweatshirt",
      gender: "men",
    },
    {
      description:
        "The Men's Quilted Shirt Jacket features a uniquely fit, quilted design for warmth and mobility in cold weather seasons. With an overall street-smart aesthetic, the jacket features subtle silicone injected Tesla logos below the back collar and on the right sleeve, as well as custom matte metal zipper pulls. Made from 87% nylon and 13% polyurethane.",
      images: ["1740507-00-A_0_2000.jpg", "1740507-00-A_1.jpg"],
      inStock: 20,
      price: 200,
      sizes: [
        {
          size: "XS",
          stock: 7,
        },
        {
          size: "M",
          stock: 10,
        },

        {
          size: "XL",
          stock: 3,
        },
      ],
      slug: "men_quilted_shirt_jacket",
      type: "shirts",
      tags: ["jacket"],
      title: "Men's Quilted Shirt Jacket",
      gender: "men",
    },

    {
      description:
        "Introducing the Tesla Raven Collection. The Men's Raven Lightweight Zip Up Bomber has a premium, modern silhouette made from a sustainable bamboo cotton blend for versatility in any season. The hoodie features subtle thermoplastic polyurethane Tesla logos on the left chest and below the back collar, a concealed chest pocket with custom matte zipper pulls and a french terry interior. Made from 70% bamboo and 30% cotton.",
      images: ["1740250-00-A_0_2000.jpg", "1740250-00-A_1.jpg"],
      inStock: 25,
      price: 130,
      sizes: [
        {
          size: "XS",
          stock: 2,
        },
        {
          size: "S",
          stock: 15,
        },

        {
          size: "M",
          stock: 8,
        },
      ],
      slug: "men_raven_lightweight_zip_up_bomber_jacket",
      type: "shirts",
      tags: ["shirt"],
      title: "Men's Raven Lightweight Zip Up Bomber Jacket",
      gender: "men",
    },

    {
      description:
        "Inspired by our popular home battery, the Tesla Powerwall Tee is made from 100% cotton and features the phrase 'Pure Energy' under our signature logo in the back. Designed for fit, comfort and style, the exclusive tee promotes sustainable energy in any environment.",
      images: ["9877034-00-A_0_2000.jpg", "9877034-00-A_2.jpg"],
      inStock: 12,
      price: 35,
      sizes: [
        {
          size: "XXL",
          stock: 7,
        },
        {
          size: "L",
          stock: 2,
        },

        {
          size: "M",
          stock: 3,
        },
      ],
      slug: "men_powerwall_tee",
      type: "shirts",
      tags: ["shirt"],
      title: "Men's Powerwall Tee",
      gender: "men",
    },

    {
      description:
        "Designed for fit, comfort and style, the Men's 3D T Logo Long Sleeve Tee is made from 100% cotton and features an understated T logo on the left chest.",
      images: ["8529198-00-A_0_2000.jpg", "8529198-00-A_1.jpg"],
      inStock: 12,
      price: 40,
      sizes: [
        {
          size: "XS",
          stock: 7,
        },
        {
          size: "XXXL",
          stock: 5,
        },
      ],
      slug: "men_3d_t_logo_long_sleeve_tee",
      type: "shirts",
      tags: ["shirt"],
      title: "Men's 3D T Logo Long Sleeve Tee",
      gender: "men",
    },
    {
      description:
        "Introducing the Tesla Chill Collection. The Chill Pullover Hoodie has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The unisex hoodie features subtle thermoplastic polyurethane Tesla logos across the chest and on the sleeve, a double layer single seam hood and pockets with custom matte zipper pulls. Made from 60% cotton and 40% recycled polyester.",
      images: ["1740051-00-A_0_2000.jpg", "1740051-00-A_1.jpg"],
      inStock: 88,
      price: 130,
      sizes: [
        {
          size: "XS",
          stock: 15,
        },
        {
          size: "S",
          stock: 18,
        },

        {
          size: "M",
          stock: 12,
        },

        {
          size: "L",
          stock: 20,
        },

        {
          size: "XL",
          stock: 10,
        },

        {
          size: "XXL",
          stock: 5,
        },

        {
          size: "XXXL",
          stock: 3,
        },
      ],
      slug: "chill_pullover_hoodie",
      type: "hoodies",
      tags: ["hoodie"],
      title: "Chill Pullover Hoodie",
      gender: "unisex",
    },

    {
      description:
        "The Women's Cropped Puffer Jacket features a uniquely cropped silhouette for the perfect, modern style while on the go during the cozy season ahead. The puffer features subtle silicone injected Tesla logos below the back collar and on the right sleeve, custom matte metal zipper pulls and a soft, fleece lined collar. Made from 87% nylon and 13% polyurethane.",
      images: ["1740535-00-A_0_2000.jpg", "1740535-00-A_1.jpg"],
      inStock: 85,
      price: 225,
      sizes: [
        {
          size: "XS",
          stock: 20,
        },
        {
          size: "S",
          stock: 15,
        },

        {
          size: "M",
          stock: 40,
        },
        {
          size: "L",
          stock: 10,
        },
      ],
      slug: "women_cropped_puffer_jacket",
      type: "hoodies",
      tags: ["hoodie"],
      title: "Women's Cropped Puffer Jacket",
      gender: "women",
    },
    {
      description:
        "Introducing the Tesla Chill Collection. The Women's Chill Half Zip Cropped Hoodie has a premium, soft fleece exterior and cropped silhouette for comfort in everyday lifestyle. The hoodie features an elastic hem that gathers at the waist, subtle thermoplastic polyurethane Tesla logos along the hood and on the sleeve, a double layer single seam hood and a custom ring zipper pull. Made from 60% cotton and 40% recycled polyester.",
      images: ["1740226-00-A_0_2000.jpg", "1740226-00-A_1.jpg"],
      inStock: 88,
      price: 130,
      sizes: [
        {
          size: "XS",
          stock: 15,
        },
        {
          size: "S",
          stock: 18,
        },

        {
          size: "M",
          stock: 12,
        },

        {
          size: "L",
          stock: 20,
        },

        {
          size: "XL",
          stock: 10,
        },

        {
          size: "XXL",
          stock: 5,
        },

        {
          size: "XXXL",
          stock: 3,
        },
      ],
      slug: "women_chill_half_zip_cropped_hoodie",
      type: "hoodies",
      tags: ["hoodie"],
      title: "Women's Chill Half Zip Cropped Hoodie",
      gender: "women",
    },
    {
      description:
        "Introducing the Tesla Raven Collection. The Women's Raven Slouchy Crew Sweatshirt has a premium, relaxed silhouette made from a sustainable bamboo cotton blend. The slouchy crew features a subtle thermoplastic polyurethane Tesla wordmark on the left sleeve and a french terry interior for a cozy look and feel in every season. Pair it with your Raven Joggers or favorite on the go fit. Made from 70% bamboo and 30% cotton.",
      images: ["1740260-00-A_0_2000.jpg", "1740260-00-A_1.jpg"],
      inStock: 9,
      price: 110,
      sizes: [
        {
          size: "XS",
          stock: 7,
        },
        {
          size: "S",
          stock: 7,
        },

        {
          size: "M",
          stock: 7,
        },
      ],
      slug: "women_raven_slouchy_crew_sweatshirt",
      type: "hoodies",
      tags: ["hoodie"],
      title: "Women's Raven Slouchy Crew Sweatshirt",
      gender: "women",
    },

    {
      description:
        "Designed for fit, comfort and style, the Kids Cybertruck Graffiti Long Sleeve Tee features a water-based Cybertruck graffiti wordmark across the chest, a Tesla wordmark down the left arm and our signature T logo on the back collar. Made from 50% cotton and 50% polyester.",
      images: ["1742694-00-A_1_2000.jpg", "1742694-00-A_3.jpg"],
      inStock: 88,
      price: 30,
      sizes: [
        {
          size: "XS",
          stock: 15,
        },
        {
          size: "S",
          stock: 18,
        },

        {
          size: "M",
          stock: 12,
        },

        {
          size: "L",
          stock: 20,
        },

        {
          size: "XL",
          stock: 10,
        },

        {
          size: "XXL",
          stock: 5,
        },

        {
          size: "XXXL",
          stock: 3,
        },
      ],
      slug: "kids_cybertruck_long_sleeve_tee",
      type: "shirts",
      tags: ["shirt"],
      title: "Kids Cybertruck Long Sleeve Tee",
      gender: "kid",
    },
    {
      description:
        "The Kids Scribble T Logo Tee is made from 100% Peruvian cotton and features a Tesla T sketched logo for every young artist to wear.",
      images: ["8529312-00-A_0_2000.jpg", "8529312-00-A_1.jpg"],
      inStock: 45,
      price: 25,
      sizes: [
        {
          size: "XS",
          stock: 15,
        },
        {
          size: "S",
          stock: 18,
        },

        {
          size: "M",
          stock: 12,
        },
      ],
      slug: "kids_scribble_t_logo_tee",
      type: "shirts",
      tags: ["shirt"],
      title: "Kids Scribble T Logo Tee",
      gender: "kid",
    },
    {
      description:
        "The Kids Cybertruck Tee features the iconic Cybertruck graffiti wordmark and is made from 100% Peruvian cotton for maximum comfort.",
      images: ["8529342-00-A_0_2000.jpg", "8529342-00-A_1.jpg"],
      inStock: 35,
      price: 25,
      sizes: [
        {
          size: "XS",
          stock: 2,
        },
        {
          size: "S",
          stock: 3,
        },

        {
          size: "M",
          stock: 10,
        },

        {
          size: "L",
          stock: 20,
        },
      ],
      slug: "kids_cybertruck_tee",
      type: "shirts",
      tags: ["shirt"],
      title: "Kids Cybertruck Tee",
      gender: "kid",
    },
  ],

  pickups: [
    {
      name: "Teslo  San Justo II",
      latitude: "-34.67918",
      longitude: "-58.5597",
    },
    {
      name: "Teslo  Shopping Las Toscas, Canning",
      latitude: "-34.85617",
      longitude: "-58.50386",
    },
    {
      name: "Teslo Laferrere",
      latitude: "-34.7482",
      longitude: "-58.58782",
    },
    {
      name: "Teslo Lanus",
      latitude: "-34.70821",
      longitude: "-58.38992",
    },
    {
      name: "Teslo Moreno",
      latitude: "-34.64799",
      longitude: "-58.79094",
    },
    {
      name: "Teslo Morón",
      latitude: "-34.64997",
      longitude: "-58.61967",
    },
    {
      name: "Teslo Moron  2 ",
      latitude: "-34.64917",
      longitude: "-58.62026",
    },
    {
      name: "Teslo Outlet  San Justo ",
      latitude: "-34.67799",
      longitude: "-58.56543",
    },
    {
      name: "Teslo Outlet Canning",
      latitude: "-34.84907",
      longitude: "-58.50503",
    },
    {
      name: "Teslo Palmas del Pilar Shopping",
      latitude: "-34.44576",
      longitude: "-58.86863",
    },
    {
      name: "Teslo Quilmes",
      latitude: "-34.72094",
      longitude: "-58.25833",
    },
    {
      name: "Teslo San Justo",
      latitude: "-34.68005",
      longitude: "-58.55835",
    },
    {
      name: "Teslo Shopping Devoto",
      latitude: "-34.61135",
      longitude: "-58.51793",
    },
    {
      name: "Teslo Shopping Devoto 2",
      latitude: "-34.61135",
      longitude: "-58.51793",
    },
    {
      name: "Teslo Shopping San Justo",
      latitude: "-34.68535",
      longitude: "-58.55694",
    },
    {
      name: "Teslo Tortugas Open Mall",
      latitude: "-34.45199",
      longitude: "-58.72622",
    },
    {
      name: "Teslo Villa Urquiza",
      latitude: "-34.57539",
      longitude: "-58.48532",
    },
  ],
};
