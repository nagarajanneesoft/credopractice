// export const products = [
//   {
//     id: 1,
//     name: "Laptop",
//     price: 55000,
//     image: "https://picsum.photos/id/0/400/250",
//     description:
//       "Fast processor, 16GB RAM, 512GB SSD. Office and coding work ku best.",
//   },
//   {
//     id: 2,
//     name: "Smart Phone",
//     price: 18000,
//     image: "https://picsum.photos/id/1/400/250",
//     description: "6.5 inch display, 5000mAh battery, 50MP camera.",
//   },
//   {
//     id: 3,
//     name: "Headphones",
//     price: 2500,
//     image: "https://picsum.photos/id/3/400/250",
//     description: "Wireless Bluetooth headphones with deep bass.",
//   },
//   {
//     id: 4,
//     name: "Smart Watch",
//     price: 4000,
//     image: "https://picsum.photos/id/20/400/250",
//     description: "Heart rate monitor, step counter, and call notifications.",
//   },
// ];

export const products = [
  {
    id: 1,
    name: "Laptop",
    category: "Computers",
    price: 55000,
    image: "https://picsum.photos/id/0/400/250",
    description:
      "Fast processor, 16GB RAM, 512GB SSD. Office and coding work ku best.",
  },
  {
    id: 2,
    name: "Smart Phone",
    category: "Mobiles",
    price: 18000,
    image: "https://picsum.photos/id/1/400/250",
    description: "6.5 inch display, 5000mAh battery, 50MP camera.",
  },
  {
    id: 3,
    name: "Headphones",
    category: "Accessories",
    price: 2500,
    image: "https://picsum.photos/id/3/400/250",
    description: "Wireless Bluetooth headphones with deep bass.",
  },
  {
    id: 4,
    name: "Smart Watch",
    category: "Accessories",
    price: 4000,
    image: "https://picsum.photos/id/20/400/250",
    description: "Heart rate monitor, step counter, and call notifications.",
  },
  {
    id: 5,
    name: "Gaming Laptop",
    category: "Computers",
    price: 85000,
    image: "https://picsum.photos/id/26/400/250",
    description: "RTX graphics, 144Hz display, 16GB RAM.",
  },
  {
    id: 6,
    name: "Budget Phone",
    category: "Mobiles",
    price: 9000,
    image: "https://picsum.photos/id/42/400/250",
    description: "Daily use ku super budget phone, 4GB RAM.",
  },
];

// Duplicate illaama unique category list (auto-a eduthukkum)
export const categories = [...new Set(products.map((item) => item.category))];
