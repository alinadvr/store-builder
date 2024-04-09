import { useEffect, useState } from "react";

export function useCart() {
  const [cartItems, setCartItems] = useState<{
    [any: string]: { [any: string]: string; product_amount: string };
  }>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storageValue = localStorage.getItem("cartItems");
      setCartItems(storageValue ? JSON.parse(storageValue) : {});
    }
  }, []);

  useEffect(() => {
    cartItems && localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  function removeItem(productId: string) {
    const newValues = { ...cartItems };
    delete newValues[productId];
    setCartItems(newValues);
  }

  function changeCartItems(
    id: string,
    options: { [any: string]: string; product_amount: string }
  ) {
    if (cartItems) {
      setCartItems({ ...cartItems, [id]: options });
    } else {
      setCartItems({ [id]: options });
    }
  }

  function clearCart() {
    setCartItems({});
  }

  return {
    cartItems,
    changeCartItems,
    removeItem,
    clearCart,
  };
}
