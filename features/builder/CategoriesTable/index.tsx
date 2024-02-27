"use client";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { CheckBoxInput } from "@/components/fields/CheckBoxInput";
import { TextInput } from "@/components/fields/TextInput";
import { Loading } from "@/components/layout/Loading";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function CategoriesTable({
  type,
}: {
  type: "categories" | "specialCategories";
}) {
  const { data: session } = useSession();

  const queryClient = useQueryClient();

  const { data: categories, isLoading } = useQuery({
    queryKey: [type, session?.user.image],
    queryFn: () =>
      axios.get(`/api/categories/${session?.user.image}`, {
        headers: { type },
      }),
    enabled: !!session?.user.image,
  });
  const createCategory = useMutation({
    mutationFn: (title: string) =>
      axios.post(
        `/api/categories/${session?.user.image}/`,
        { title },
        { headers: { type } }
      ),
    onSuccess: (data) => {
      queryClient.setQueryData([type, session?.user.image], data);
    },
  });
  const deleteCategory = useMutation({
    mutationFn: (title: string) =>
      axios.delete(`/api/categories/${session?.user.image}/`, {
        headers: { type, title },
      }),
    onSuccess: (data) => {
      queryClient.setQueryData([type, session?.user.image], data);
    },
  });

  return (
    <main>
      <div className="flex flex-col gap-5 rounded-xl bg-white p-6 drop-shadow">
        <div className="text-center">
          <h1 className="text-xl font-bold">
            {type === "specialCategories" ? "Special Categories" : "Categories"}
          </h1>
          <p className="text-sm text-slate-400">
            (
            {type === "specialCategories"
              ? "displayed as separate block on the main shop page"
              : "displayed at header"}
            )
          </p>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="w-8"></th>
              <th>Title</th>
              <th className="w-8"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {isLoading && (
                <td colSpan={3} className="py-4 text-center">
                  <Loading />
                </td>
              )}
            </tr>
            {!isLoading &&
              (categories ? (
                categories.data[0] !== "EMPTY_SPECIAL_CATEGORIES" &&
                categories.data[0] !== "" ? (
                  categories.data.map((category: string, index: number) => (
                    <tr key={category + index}>
                      <td className="text-center">
                        <CheckBoxInput id={category + index} name={category} />
                      </td>
                      <td>
                        <label htmlFor={category + index}>{category}</label>
                      </td>
                      <td>
                        <TrashIcon
                          className="w-5 cursor-pointer text-slate-400"
                          onClick={() => deleteCategory.mutate(category)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="w-full text-center">
                      No categories yet. Use the input with button bellow
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan={3} className="w-full text-center">
                    Something went wrong. Please reload the page
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <form
          className="flex gap-3"
          action={(data: FormData) =>
            createCategory.mutate(data.get("category")?.valueOf() as string)
          }
        >
          <TextInput
            type="text"
            id="category"
            name="category"
            placeHolder={
              type === "categories" ? "e.g. Jeans" : "e.g. Best Sellers"
            }
            required={true}
          />
          <PrimaryButton
            buttonType="button"
            text="Add category"
            type="submit"
            className="w-52"
          />
        </form>
      </div>
    </main>
  );
}
