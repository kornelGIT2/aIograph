"use client";
import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "sonner";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import { dataUrl } from "@/lib/utils";
import { Button } from "../ui/button";

type ImageUploadProps = {
  publicId: string;
  onPublicIdChange: (value: string) => void;
  setImage: React.Dispatch<any>;
};

function ImageUpload({
  publicId,
  setImage,
  onPublicIdChange,
}: ImageUploadProps) {
  const uploadSuccess = (res: any) => {
    setImage((prevData: any) => ({
      ...prevData,
      publicId: res.info?.public_id,
      width: res.info?.width,
      height: res.info?.height,
      secureUrl: res.info?.secure_url,
    }));

    onPublicIdChange(res.info?.public_id);
    toast.success("Image has been uploaded successfuly");
  };

  const uploadError = (res: any) => {
    toast.error("Error");
  };

  return (
    <CldUploadWidget
      uploadPreset="jsm_aiograph"
      options={{ multiple: false, resourceType: "image" }}
      onError={uploadError}
      onSuccess={uploadSuccess}
    >
      {({ open }) => (
        <div className="flex flex-col gap-2">
          <h3 className="h3-bold text-primary opacity-80">Original Image</h3>

          {publicId ? (
            <>
              <div
                className="cursor-pointer  overflow-hidden rounded-[10px] "
                onClick={() => open()}
              >
                <CldImage
                  width={300}
                  height={200}
                  src={publicId}
                  alt="image"
                  placeholder={dataUrl as PlaceholderValue}
                  sizes={"(max-width: 767px) 100vw, 50vw"}
                  className="media-uploader_cldImage dark:border-none"
                />
              </div>
            </>
          ) : (
            <div
              className="media-uploader_cta dark:border-none hover:opacity-70"
              onClick={() => open()}
            >
              <div className="media-uploader_cta-image  opacity-80">
                <Image
                  src="/add_circle.svg"
                  alt="Add Image"
                  width={24}
                  height={24}
                />
              </div>
              <p className="p-12-medium">Click here to upload image</p>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
}

export default ImageUpload;
