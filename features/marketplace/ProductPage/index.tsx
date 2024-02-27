"use client";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Loading } from "@/components/layout/Loading";
import { DefaultLayout } from "@/features/builder/DefaultTheme/DefaultLayout";
import { DefaultProductPage } from "@/features/builder/DefaultTheme/DefaultProductPage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ToastContainer } from "react-toastify";

export function ProductPage({
  shopLink,
  productTitle,
}: {
  shopLink: string;
  productTitle: string;
}) {
  const { data: product, isLoading } = useQuery({
    queryKey: ["products", shopLink, productTitle],
    queryFn: () => axios.get(`/api/products/${shopLink}/${productTitle}`),
  });

  if (isLoading)
    return (
      <div className="flex w-screen items-center justify-center pt-96">
        <div className="flex flex-col items-center gap-10">
          <h1 className="text-4xl  text-violet-700">
            We are looking for the product you are looking for
          </h1>
          <Loading size="big" />
        </div>
      </div>
    );

  if (product && product.data)
    return (
      <DefaultLayout shopLink={shopLink}>
        <DefaultProductPage product={product.data} />
        <ToastContainer />
      </DefaultLayout>
    );

  return (
    <div className="flex w-screen items-center justify-center pt-96">
      <div className="flex flex-col items-center gap-6">
        <p className="text-2xl">Sorry, we can&#39;t find this product</p>
        <PrimaryButton
          buttonType="link"
          text="Home Page"
          to="/"
          className="h-14 w-36"
        />
      </div>
    </div>
  );
}
