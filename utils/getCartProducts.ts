import { CartProductDataType } from "@/features/marketplace/ProductList/CartItem";
import { ProductDataType } from "@/models/productModel";

export function getCartProducts(
  products: ProductDataType[],
  cartItems: { [p: string]: { [p: string]: string; product_amount: string } }
) {
  const cartProducts: CartProductDataType[] = [];
  products.forEach((product: ProductDataType) => {
    if (product._id in cartItems)
      cartProducts.push({ ...product, options: cartItems[product._id] });
  });
  return cartProducts;
}
