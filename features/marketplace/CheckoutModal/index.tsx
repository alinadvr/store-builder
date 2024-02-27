"use client";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { SelectInput } from "@/components/fields/SelectInput";
import { TextInput } from "@/components/fields/TextInput";
import { CartProductDataType } from "@/features/marketplace/ProductList/CartItem";
import classNames from "@/utils/classNames";
import { useCart } from "@/utils/useCart";
import axios from "axios";
import { toast } from "react-toastify";

export function CheckoutModal({
  totalPrice,
  sale,
  isOpen,
  close,
  cartProducts,
}: {
  totalPrice: number;
  sale: number;
  isOpen: boolean;
  close: () => void;
  cartProducts: CartProductDataType[];
}) {
  const { clearCart } = useCart();

  function createOrder(event: any) {
    event.preventDefault();

    try {
      const response = axios.post("api/orders", {
        name: event.target[0].value,
        surname: event.target[1].value,
        email: event.target[2].value,
        address: event.target[3].value,
        phoneNumber: event.target[4].value,
        city: event.target[5].value,
        zip: event.target[6].value,
        state: event.target[7].value,
        country: event.target[8].value,
        paymentMethod: event.target[9].value,
        cartProducts,
      });

      clearCart();
      close();
      toast.success("Order has been sent successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div
      className={classNames(
        "fixed inset-0 z-50 flex items-center justify-center bg-overlay transition-opacity duration-500",
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      )}
    >
      <form
        onSubmit={createOrder}
        className={classNames(
          "mx-auto flex w-1/3 flex-col gap-3 rounded-xl bg-violet-200 p-8 drop-shadow-lg transition-transform duration-500",
          isOpen ? "translate-y-0" : "-translate-y-20"
        )}
      >
        <div className="flex gap-3">
          <label htmlFor="name" className="text-violet-600">
            Name
            <TextInput
              type="text"
              id="name"
              name="name"
              required={true}
              placeHolder="e.g. Martin"
            />
          </label>
          <label htmlFor="surname" className="text-violet-600">
            Surname
            <TextInput
              type="text"
              id="surname"
              name="surname"
              required={true}
              placeHolder="e.g. Smith"
            />
          </label>
        </div>
        <label htmlFor="email" className="text-violet-600">
          Email
          <TextInput
            type="email"
            id="email"
            name="email"
            required={true}
            placeHolder="e.g. martin.smith@gmail.com"
          />
          <p className="mt-1 text-center text-xs text-violet-400">
            (We need your email to send you order details. We won&lsquo;t send
            you any news, at least if you don&lsquo;t want to)
          </p>
        </label>
        <div className="flex gap-3">
          <label htmlFor="address" className="text-violet-600">
            Address
            <TextInput
              type="text"
              id="address"
              name="address"
              required={true}
              placeHolder="e.g. Madison Rd"
            />
          </label>
          <label htmlFor="phoneNumber" className="text-violet-600">
            Phone number
            <TextInput
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              required={true}
              placeHolder="e.g. +38 (057) 563-32-45"
            />
          </label>
        </div>
        <div className="flex gap-2">
          <label htmlFor="city" className="text-violet-600">
            City
            <TextInput
              type="text"
              id="city"
              name="city"
              required={true}
              placeHolder="e.g. Cincinnati"
            />
          </label>
          <label htmlFor="zip" className="text-violet-600">
            Zip code
            <TextInput
              type="text"
              id="zip"
              name="zip"
              required={true}
              placeHolder="e.g. 45209"
            />
          </label>
          <label htmlFor="state" className="text-violet-600">
            State
            <TextInput
              type="text"
              id="state"
              name="state"
              required={true}
              placeHolder="e.g. OH"
            />
          </label>
        </div>
        <label htmlFor="country" className="text-violet-600">
          Country
          <TextInput
            type="text"
            id="country"
            name="country"
            required={true}
            placeHolder="e.g. USA"
          />
        </label>
        <label htmlFor="payment" className="text-violet-600">
          Payment method
          <SelectInput
            id="payment"
            name="payment"
            options={["Cash", "Card"]}
            required={true}
          />
        </label>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-2xl font-bold text-violet-800">
            Total price: {totalPrice.toFixed(2)}€
          </p>
          <div className="flex gap-3">
            <SecondaryButton
              buttonType="button"
              type="button"
              onClick={close}
              text="Cancel"
              className="w-28"
            />
            <PrimaryButton
              buttonType="button"
              type="submit"
              text="Confirm"
              className="h-10 w-40"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
