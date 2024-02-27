import { ProductDataType } from "@/models/productModel";

export const defaultProducts: ProductDataType[] = [
  {
    _id: "1",
    title: "Product 1",
    price: "18.99",
    categoryShop: "Category 1",
    categoryMP: "Tops",
    shop: "",
    amount: 10,
    images: ["/defaultProduct.png"],
    specialCategory: "Best Sellers",
    article: "article 1",
  },
  {
    _id: "2",
    title: "Product 2",
    price: "18.99",
    discountPrice: "10.50",
    categoryShop: "Category 2",
    categoryMP: "Pants",
    shop: "",
    amount: 10,
    images: ["/defaultProduct.png"],
    specialCategory: "Sales",
    article: "article 2",
  },
];
