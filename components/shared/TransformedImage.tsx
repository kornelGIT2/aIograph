"use client";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import React from "react";
import { IImage } from "@/lib/database/models/image_model";
import { CircularProgress } from "@mui/material";
import { Transformations } from "@/types/types";
import { toast } from "sonner";
import { errorDebounce } from "@/lib/utils";

type TransformedImageProps = {
  image: IImage | null;
  isTransforming: boolean;
  transformationConfig: Transformations | null;
  setTransforming: React.Dispatch<boolean>;
};

function TransformedImage({
  image,
  isTransforming,
  transformationConfig,
  setTransforming,
}: TransformedImageProps) {
  console.log(transformationConfig);
  return (
    <div className="flex flex-col gap-2 ">
      <h3 className="h3-bold text-primary opacity-80">Transformed Image</h3>
      {image?.publicId && transformationConfig ? (
        <>
          <div className="overflow-hidden rounded-[10px]">
            <CldImage
              width={500} //TODO CHANGE WIDTH AND HEIGHT PROPERTIES
              height={500}
              src={image?.publicId}
              alt={image?.title}
              sizes={"(max-width: 767px) 100vw, 50vw"}
              className="media-uploader_cldImage dark:border-none"
              onLoad={() => {
                setTransforming(false);
              }}
              onError={() => {
                setTransforming(false);
              }}
              {...transformationConfig}
            />
          </div>
          {isTransforming ? <CircularProgress /> : null}
        </>
      ) : (
        <div className="media-uploader_cta dark:border-none ">
          <p className="p-14-medium">
            Apply the transformation to visualize the altered image
          </p>
        </div>
      )}
    </div>
  );
}

export default TransformedImage;
