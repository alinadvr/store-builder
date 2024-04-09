"use client";

import { Loading } from "@/components/layout/Loading";
import { FilterBlock } from "@/features/marketplace/FilterBlock";
import { FilterTabs } from "@/features/marketplace/FilterBlock/FilterTabs";
import { ProductBlock } from "@/features/marketplace/ProductBlock";
import { Product } from "@/models/productModel";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Category({ params }: { params: { category: string } }) {
  const [selectedFilters, setSelectedFilters] = useState<
    { filter: string; options: string[] }[]
  >([]);
  const { value: saved, setValue: setSaved } = useLocalStorage({
    key: "saved",
    defaultValue: [],
  });

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", "categories", getCategoryFromURL(params.category)],
    queryFn: () =>
      axios(`/api/products/categories/${getCategoryFromURL(params.category)}`),
  });

  const [filteredData, setFilteredData] = useState<Product[]>([]);

  function getCategoryFromURL(url: string) {
    return decodeURI(url.split("%2C").join(","));
  }

  function handleFilterOnChange(filter: string, option: string) {
    const selectedFilter = getSelectedFilter(filter);

    // if filter has been selected before, check if option has been selected
    // if filter has not been selected before, push the filter with the option
    if (selectedFilter) {
      const prevArray = selectedFilters.filter((el) => el !== selectedFilter);
      // if selected option is the only element delete full filter
      // if there are more options on filter delete only selected option
      if (
        selectedFilter.options[0] === option &&
        selectedFilter.options[1] === undefined
      ) {
        setSelectedFilters(prevArray);
      } else if (selectedFilter.options.includes(option)) {
        setSelectedFilters([
          ...prevArray,
          {
            filter,
            options: [
              ...selectedFilter.options.filter((opt) => opt !== option),
            ],
          },
        ]);
      } else {
        setSelectedFilters([
          ...prevArray,
          {
            filter,
            options: [...selectedFilter.options, option],
          },
        ]);
      }
    } else {
      setSelectedFilters((prevState) => [
        ...prevState,
        { filter, options: [option] },
      ]);
    }
  }

  function getSelectedFilter(filter: string) {
    return selectedFilters.filter(
      (selectedFilter) => selectedFilter["filter"] === filter,
    )[0];
  }

  useEffect(() => {
    products && setFilteredData(products.data);
  }, [products]);

  useEffect(() => {
    if (products && products?.data.length > 0) {
      if (selectedFilters.length === 0) setFilteredData(products.data);
      else {
        const newFilteredData: Product[] = [];
        products.data.map((product: Product) => {
          product.options &&
            selectedFilters.forEach((selectedFilter) => {
              if (product.options && selectedFilter.filter in product.options) {
                selectedFilter.options.map((option) => {
                  product.options![selectedFilter.filter].includes(option) &&
                    newFilteredData.indexOf(product) === -1 &&
                    newFilteredData.push(product);
                });
              }
            });
        });
        setFilteredData(newFilteredData);
      }
    }
  }, [selectedFilters]);

  return (
    <main className="mx-auto flex w-3/4 flex-col gap-6">
      <div className="flex gap-5">
        <nav className="inline-flex min-w-[20rem] items-center gap-2">
          <h1 className="text-3xl dark:text-violet-300">Categories</h1>
          <span className="text-slate-300 dark:text-violet-400">/</span>
          <span className="text-slate-300 dark:text-violet-400">
            {getCategoryFromURL(params.category)}
          </span>
        </nav>
        {selectedFilters.length > 0 && (
          <FilterTabs
            selectedFilters={selectedFilters}
            handleFilterOnChange={handleFilterOnChange}
            clearAll={() => setSelectedFilters([])}
          />
        )}
      </div>
      <div className="flex gap-5">
        <FilterBlock
          getSelectedFilter={getSelectedFilter}
          handleFilterOnChange={handleFilterOnChange}
        />
        <div className="flex w-3/4 flex-col items-center gap-16">
          {isLoading ? (
            <div className="py-40">
              <Loading size="medium" />
            </div>
          ) : products ? (
            filteredData.length > 0 ? (
              <>
                <div className="grid w-full grid-cols-4 gap-4">
                  {filteredData.map((product: any) => (
                    <ProductBlock
                      key={product._id}
                      saved={saved?.indexOf(product._id) !== -1}
                      updateSaved={() => setSaved(product._id)}
                      {...product}
                    />
                  ))}
                </div>
                {/*<Pagination />*/}
              </>
            ) : (
              <p className="w-full p-52 text-center text-2xl text-slate-300">
                Category is empty
              </p>
            )
          ) : (
            <p className="w-full p-52 text-center text-2xl text-slate-300">
              Something went wrong. Please reload the page
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
