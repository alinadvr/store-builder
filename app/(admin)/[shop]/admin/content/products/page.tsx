"use client";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Loading } from "@/components/layout/Loading";
import { Product } from "@/models/productModel";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Products({ params }: { params: { shop: string } }) {
  const session = useSession();
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", session.data?.user.image],
    queryFn: () => axios.get(`/api/products/${session.data?.user.image}`),
    enabled: !!session.data?.user.image,
  });

  const deleteProduct = useMutation({
    mutationFn: (title: string) =>
      axios.delete(`/api/products/${session.data?.user.image}/${title}/`),
    onSuccess: ({ data }) => {
      console.log(data);
      queryClient.setQueryData(
        ["products", session.data?.user.image],
        products && {
          data: products.data.filter(
            (product: Product) => product._id !== data._id,
          ),
        },
      );
    },
  });

  return (
    <main className="flex flex-col gap-2 pr-10">
      <PrimaryButton
        buttonType="link"
        text="+ Add product"
        to={`/${params.shop}/admin/content/product`}
        className="h-10 w-40 drop-shadow"
      />
      <table className="rounded-xl border bg-white text-center drop-shadow">
        <thead className="border-b border-slate-200">
          <tr>
            {[
              "Article",
              "Title",
              "Price",
              "Discount Price",
              "Amount",
              "Category Shop",
              "Category MP",
              "Delete",
            ].map((el) => (
              <th key={el} className="p-4">
                {el}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={7} className="py-10 text-center text-slate-400">
                <Loading />
              </td>
            </tr>
          )}
          {!isLoading &&
            (products ? (
              products.data.length > 0 ? (
                products.data.map(
                  ({
                    _id,
                    article,
                    title,
                    price,
                    discountPrice,
                    amount,
                    categoryShop,
                    categoryMP,
                  }: Product) => (
                    <tr key={title}>
                      <td className="p-4">{article}</td>
                      <td className="p-4">
                        <Link
                          href={`/shop/${session.data?.user.image}/${title}`}
                        >
                          {title}
                        </Link>
                      </td>
                      <td className="p-4">{price}</td>
                      <td className="p-4">
                        {discountPrice ? discountPrice : "-"}
                      </td>
                      <td className="p-4">{amount}</td>
                      <td className="p-4">{categoryShop}</td>
                      <td className="p-4">{categoryMP}</td>
                      <td className="flex items-center justify-center p-4">
                        <TrashIcon
                          className="w-5 cursor-pointer text-slate-400"
                          onClick={() => {
                            console.log("click");
                            deleteProduct.mutate(title);
                          }}
                        />
                      </td>
                    </tr>
                  ),
                )
              ) : (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400">
                    No products yet
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td colSpan={7} className="text-center">
                  Something went wrong. Please reload the page
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
}
