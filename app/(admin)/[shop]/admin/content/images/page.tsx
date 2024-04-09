"use client";

import { OurFileRouter } from "@/app/api/uploadthing/core";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { ImageUpload } from "@/features/builder/ImageUpload";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Images({ params }: { params: { shop: string } }) {
  const [banner, setBanner] = useState<File[]>([]);
  const [image, setImage] = useState<File[]>([]);
  const [logo, setLogo] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { useUploadThing } = generateReactHelpers<OurFileRouter>();

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      return res;
    },
    onUploadError: (e) => {
      toast.error(e.message);
    },
  });

  async function handleButtonClick(files: File[], value: string) {
    setIsLoading(true);
    const res = await startUpload(files);
    if (res) {
      try {
        const response = await axios.put(
          `/api/shops/${params.shop}`,
          { fileUrl: res[0].fileUrl },
          {
            headers: { value },
          },
        );

        toast.success("Image uploaded successfully");

        switch (value) {
          case "image":
            return setImage([]);
          case "banner":
            return setBanner([]);
          case "logo":
            return setLogo([]);
        }
      } catch (error: any) {
        console.log(error);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    } else toast.error("Something went wrong. Try to reload the page");
  }

  return (
    <main className="mx-auto w-1/2">
      <div className="flex flex-col gap-5 rounded-xl bg-white p-5 drop-shadow">
        <section>
          <p>Add shop image that is displayed on the marketplace</p>
          <ImageUpload
            files={image}
            setFiles={(files) => setImage(files)}
            deleteFile={(file) =>
              setImage([...image.filter((el) => el !== file)])
            }
          />
          <PrimaryButton
            buttonType="button"
            text="Upload"
            type="button"
            className="mt-3 h-10 w-32"
            isLoading={isLoading}
            disabled={image.length < 1}
            onClick={() => handleButtonClick(image, "image")}
          />
        </section>
        <section>
          <p>Add banner to the main page of your shop</p>
          <ImageUpload
            files={banner}
            setFiles={(files) => setBanner(files)}
            deleteFile={(file) =>
              setBanner([...banner.filter((el) => el !== file)])
            }
          />
          <PrimaryButton
            buttonType="button"
            text="Upload"
            type="button"
            className="mt-3 h-10 w-32"
            isLoading={isLoading}
            disabled={banner.length < 1}
            onClick={() => handleButtonClick(banner, "banner")}
          />
        </section>
        <section>
          <p>Add shop logo that is displayed in header</p>
          <ImageUpload
            files={logo}
            setFiles={(files) => setLogo(files)}
            deleteFile={(file) =>
              setLogo([...logo.filter((el) => el !== file)])
            }
          />
          <PrimaryButton
            buttonType="button"
            text="Upload"
            type="button"
            className="mt-3 h-10 w-32"
            isLoading={isLoading}
            disabled={logo.length < 1}
            onClick={() => handleButtonClick(logo, "logo")}
          />
        </section>
      </div>
    </main>
  );
}
