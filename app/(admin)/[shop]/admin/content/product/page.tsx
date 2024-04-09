"use client";

import axios, { AxiosError } from "axios";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { generateReactHelpers } from "@uploadthing/react/hooks";

import { mergeArrays } from "@/utils/mergeArrays";
import { categories } from "@/components/layout/Header/categories";

import { Loading } from "@/components/layout/Loading";
import { TextInput } from "@/components/fields/TextInput";
import { ImageUpload } from "@/features/builder/ImageUpload";
import { NumberInput } from "@/components/fields/NumberInput";
import { SelectInput } from "@/components/fields/SelectInput";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { TextAreaInput } from "@/components/fields/TextAreaInput";
import { AddOptionBlock } from "@/features/builder/AddOptionBlock";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { DefaultMessages } from "@/types/manifest";

export default function Product({ params }: { params: { shop: string } }) {
  const router = useRouter();
  const { data: session } = useSession();

  const { data: categoriesShop, isLoading: categoriesShopIsLoading } = useQuery(
    {
      queryKey: ["categories", session?.user.link],
      queryFn: () =>
        axios.get(`/api/categories/${session?.user.link}`, {
          headers: { type: "categories" },
        }),
      enabled: !!session?.user.link,
    },
  );

  const { data: specialCategories, isLoading: specialCategoriesIsLoading } =
    useQuery({
      queryKey: ["specialCategories", session?.user.link],
      queryFn: () =>
        axios.get(`/api/categories/${session?.user.link}`, {
          headers: { type: "specialCategories" },
        }),
      enabled: !!session?.user.link,
    });

  const { useUploadThing } = generateReactHelpers<OurFileRouter>();
  const [files, setFiles] = useState<File[]>([]);

  const [options, setOptions] = useState<{ [any: string]: string[] }>({});

  const [isLoading, setIsLoading] = useState(false);

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      return res;
    },
    onUploadError: (e) => {
      toast.error(e.message);
    },
  });

  const categoriesMP = categories.map(({ subcategories }) =>
    subcategories.map((subcat) => subcat),
  );

  function deleteImage(deleteFile: File) {
    setFiles((prevState) => [
      ...prevState.filter(
        (file) =>
          file.name !== deleteFile.name &&
          file.lastModified !== deleteFile.lastModified,
      ),
    ]);
  }

  async function addProduct(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    const data = new FormData(event.target as HTMLFormElement);

    const images: string[] = [];

    const res = await startUpload(files);
    res && res.forEach(({ fileKey, fileUrl }) => images.push(fileUrl));

    try {
      await axios.post("/api/products", {
        title: data.get("title")?.valueOf(),
        price: data.get("price")?.valueOf(),
        discountPrice:
          data.get("discountPrice")?.valueOf() !== "0"
            ? data.get("discountPrice")?.valueOf()
            : undefined,
        article: data.get("article")?.valueOf(),
        categoryShop: data.get("categoryShop")?.valueOf(),
        categoryMP: data.get("categoryMP")?.valueOf(),
        amount: data.get("amount")?.valueOf(),
        description: data.get("description")?.valueOf(),
        specialCategory: data.get("specialCategory")?.valueOf(),
        shop: session?.user.link,
        options,
        images,
      });

      router.push(`/${session?.user.link}/admin/content/products`);
    } catch (error) {
      toast.error(
        error instanceof AxiosError && error?.response?.data.message
          ? error.response.data.message
          : DefaultMessages.ServerError,
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex justify-center">
      <form
        onSubmit={(event) => {
          setIsLoading(true);
          addProduct;
        }}
        className="flex w-1/2 flex-col gap-6 rounded-xl bg-white p-6 drop-shadow"
      >
        <label htmlFor="title">
          Enter product title <span className="text-lg text-red-500">*</span>
          <TextInput
            type="text"
            required={true}
            id="title"
            name="title"
            placeHolder="e.g. Jeans"
          />
        </label>
        <label htmlFor="article">
          Enter product article <span className="text-lg text-red-500">*</span>
          <TextInput
            type="text"
            id="article"
            name="article"
            placeHolder="e.g. N876Y7SD"
            required={true}
          />
        </label>
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="price" className="w-1/2">
            Enter product price <span className="text-lg text-red-500">*</span>
            <NumberInput
              min={0}
              id="price"
              name="price"
              step={0.01}
              required={true}
            />
          </label>
          <label htmlFor="discountPrice" className="w-1/2">
            Enter product discount price
            <NumberInput
              min={0}
              id="discountPrice"
              name="discountPrice"
              step={0.01}
            />
          </label>
        </div>
        <ImageUpload
          files={files}
          setFiles={(files) =>
            setFiles((prevState) => [...prevState, ...files])
          }
          deleteFile={deleteImage}
        />
        <label htmlFor="description">
          Enter product description
          <TextAreaInput
            id="description"
            name="description"
            placeholder="e.g. Jeans are made from 100% organic cotton."
          />
        </label>
        {categoriesShopIsLoading ? (
          <Loading />
        ) : categoriesShop && categoriesShop.data.length > 0 ? (
          <label htmlFor="categoryShop">
            Select the category in which the product will be displayed in your
            shop
            <span className="text-lg text-red-500">*</span>
            <SelectInput
              id="categoryShop"
              name="categoryShop"
              options={categoriesShop.data}
              required={true}
            />
          </label>
        ) : (
          <p className="text-lg text-red-500">
            The shop doesn&lsquo;t have any category. Please add at least one in{" "}
            <Link
              href={`/${session?.user.link}/admin/content/categories`}
              className="underline"
            >
              the &ldquo;Categories&rdquo; tab
            </Link>
          </p>
        )}
        {specialCategoriesIsLoading ? (
          <Loading />
        ) : (
          specialCategories &&
          specialCategories.data.length > 0 &&
          specialCategories.data[0] !== "" &&
          specialCategories.data[0] !== "EMPTY_SPECIAL_CATEGORIES" && (
            <label htmlFor="specialCategory">
              Select a category to display the product on the main page of your
              store
              <SelectInput
                id="specialCategory"
                name="specialCategory"
                options={specialCategories.data}
                placeholder="Select special category"
              />
            </label>
          )
        )}
        <label htmlFor="categoryMP">
          Select the category in which the product will be displayed on the
          marketplace <span className="text-lg text-red-500">*</span>
          <SelectInput
            id="categoryMP"
            name="categoryMP"
            options={mergeArrays(categoriesMP)}
            required={true}
          />
        </label>
        <label htmlFor="amount" className="w-1/2">
          Enter the quantity of the product in stock
          <NumberInput
            min={0}
            id="amount"
            name="amount"
            defaultValue={100}
            step={10}
          />
        </label>
        <AddOptionBlock
          saveOption={(option) =>
            setOptions((prevState) => {
              return { ...prevState, ...option };
            })
          }
        />
        {Object.keys(options).length > 0 &&
          Object.keys(options).map((option) => (
            <ul key={option} className="flex gap-1">
              <span className="font-medium">{option}: </span>
              {options[option].map((value, index) => (
                <li key={value}>
                  {value}
                  {index < options[option].length - 1 ? ", " : ""}
                </li>
              ))}
            </ul>
          ))}
        <div className="ml-[50%] flex w-1/2 items-end justify-end gap-4">
          <SecondaryButton
            buttonType="link"
            text="Back"
            to={`/${params.shop}/admin/content/products`}
            className="h-8 w-32"
          />
          <PrimaryButton
            buttonType="button"
            type="submit"
            text="Add"
            className="h-10 w-40"
            disabled={
              (!categoriesShopIsLoading && categoriesShop?.data.length <= 0) ||
              files.length <= 0
            }
            isLoading={isLoading}
          />
        </div>
      </form>
    </main>
  );
}
