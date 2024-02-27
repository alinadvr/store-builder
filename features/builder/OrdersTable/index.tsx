"use client";

import { Loading } from "@/components/layout/Loading";
import { OrderDataType } from "@/models/orderModel";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function OrdersTable({ shopLink }: { shopLink: string }) {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", shopLink],
    queryFn: () => axios.get(`/api/orders/${shopLink}`),
  });

  return (
    <main>
      <table className="border-spacing-6 rounded-xl bg-white pr-10 drop-shadow">
        <thead>
          <tr>
            {[
              "Number",
              "Date",
              "Status",
              "Customer",
              "Address",
              "Phone Number",
              "Products",
              "Price",
              "Payment Method",
            ].map((el) => (
              <th key={el} className="p-4">
                {el}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!isLoading ? (
            orders ? (
              orders.data.length > 0 ? (
                orders.data.map(
                  (
                    {
                      _id,
                      date,
                      status,
                      customer,
                      paymentMethod,
                    }: OrderDataType,
                    index: number
                  ) => (
                    <tr key={_id}>
                      <td className="px-4 text-center">{index}</td>
                      <td className="px-4 text-center">
                        {new Date(date).toDateString()}
                      </td>
                      <td className="px-4 text-center">{status}</td>
                      <td className="px-4 text-center">{`${customer.name} ${customer.surname}`}</td>
                      <td className="px-4 text-center">{`${customer.address}, ${customer.city}, ${customer.state} ${customer.zip}, ${customer.country}`}</td>
                      <td className="px-4 text-center">
                        {customer.phoneNumber}
                      </td>
                      <td className="px-4 text-center">
                        Skater Schuhe mit Band vorne, Buchstaben Grafik, für
                        Frauen
                      </td>
                      <td className="px-4 text-center">18.50€</td>
                      <td className="px-4 text-center">{paymentMethod}</td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={9} className="text-center text-slate-300">
                    No orders
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td colSpan={9} className="text-center text-slate-300">
                  Something went wrong. Please reload the page
                </td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan={9}>
                <Loading size="medium" />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
