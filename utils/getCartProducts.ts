import { CartProductDataType } from "@/features/marketplace/ProductList/CartItem";
import { Product } from "@/models/productModel";

export function getCartProducts(
  products: Product[],
  cartItems: { [p: string]: { [p: string]: string; product_amount: string } },
) {
  const cartProducts: CartProductDataType[] = [];
  products.forEach((product: Product) => {
    if (product._id in cartItems)
      cartProducts.push({ ...product, options: cartItems[product._id] });
  });
  return cartProducts;
}
