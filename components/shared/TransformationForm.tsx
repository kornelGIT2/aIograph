"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomField } from "./CustomField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { aspectRatioOptions, defaultValues } from "@/const";
import { AspectRatioKey, mergeObjects } from "@/lib/utils";
import { useEffect, useState } from "react";
import type { TransformationTypeKey, Transformations } from "@/types/types";
import { Separator } from "../ui/separator";
import { useDebounce } from "@/hooks/useDebounce";
import { IImage } from "@/lib/database/models/image_model";
import { transformationTypes } from "@/const";
import ImageUpload from "./ImageUpload";
import TransformedImage from "./TransformedImage";
import Image from "next/image";
import { useTransition } from "react";

export const formSchema = z.object({
  title: z.string(),
  color: z.string().optional(),
  aspectRatio: z.string(),
  prompt: z.string(),
  publicId: z.string(),
});

type FormProps = {
  action: "ADD" | "UPDATE";
  type: TransformationTypeKey | string;
  userId: string;
  data?: IImage | null;
  creditBalance: number;
  config?: Transformations | null | undefined;
};

const TransformationForm = ({
  action,
  type,
  userId,
  data = null,
  creditBalance,
  config = null,
}: FormProps) => {
  const [prompt, setPrompt] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [newTransformation, setNewTransformation] =
    useState<Transformations | null>(null);
  const [transformationConfig, setTransformationConfig] = useState(config);
  const [isPending, startTransition] = useTransition();
  const [transforming, setTransforming] = useState(false);
  const [progress, setProgress] = useState(13);

  const [image, setImage] = useState(data);

  const debouncedValue = useDebounce(prompt, 1000);

  const transformImage = () => {
    setTransforming(true);

    console.log(newTransformation, transformationConfig);

    const mergedObjects = mergeObjects(newTransformation, transformationConfig);

    console.log(mergedObjects);

    setTransformationConfig(mergedObjects);

    setNewTransformation(null);

    //TODO: UPDATE USER CREDIT BALANCE
  };

  useEffect(() => {
    setNewTransformation((prevState: any) =>
      type !== "background_remove" && type !== "image_restore"
        ? image && {
            [fieldType]: {
              ...prevState?.[fieldType],
              [fieldName === "prompt" ? "prompt" : "to"]: debouncedValue,
            },
          }
        : image && transformationTypes[type as TransformationTypeKey].config
    );
  }, [debouncedValue, fieldType, fieldName, type, image]);

  const initialValues =
    data && action === "UPDATE"
      ? {
          title: data?.title,
          aspectRatio: data?.aspectRatio,
          color: data?.color,
          prompt: data?.prompt,
          publicId: data?.publicId,
        }
      : defaultValues;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const handleSelect = (value: string) => {
    const imageSize = aspectRatioOptions[value as AspectRatioKey];

    setImage((prevData: any) => ({
      ...prevData,
      aspectRatio: imageSize.aspectRatio,
      width: imageSize.width,
      height: imageSize.height,
    }));

    setNewTransformation(
      transformationTypes[type as TransformationTypeKey].config
    );
  };

  const handleInput = (fieldName: string, value: string, type: string) => {
    setPrompt(value);
    setFieldName(fieldName);
    setFieldType(type);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10">
        <CustomField
          render={({ field }) => <Input {...field} className="input-field" />}
          control={form.control}
          name="title"
          formLabel="Image Title"
          className="w-full"
        />
        <Separator />
        {type === "generative_fill" ? (
          <CustomField
            render={({ field }) => (
              <Select
                onValueChange={(e) => {
                  handleSelect(e);
                }}
              >
                <SelectTrigger className="select-field">
                  <SelectValue placeholder="Aspect Ratio" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(aspectRatioOptions).map((option) => {
                    return (
                      <SelectItem
                        key={option}
                        value={option}
                        className="select-item"
                      >
                        {aspectRatioOptions[option as AspectRatioKey].label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
            control={form.control}
            name="aspectRatio"
            formLabel="Aspect Ratio"
            className="w-full"
          />
        ) : null}

        {(type === "object_remove" || type === "object_recolor") && (
          <div className="flex flex-col gap-4">
            <CustomField
              control={form.control}
              name="prompt"
              formLabel={
                type === "object_remove"
                  ? "Object to remove"
                  : "Object to recolor"
              }
              className="w-full"
              render={({ field }) => (
                <Input
                  value={field.value}
                  className="input-field"
                  onChange={(e) => handleInput("prompt", e.target.value, type)}
                />
              )}
            />

            {type === "object_recolor" && (
              <CustomField
                control={form.control}
                name="color"
                formLabel="Replacement Color"
                className="w-full"
                render={({ field }) => (
                  <Input
                    value={field.value}
                    className="input-field"
                    onChange={(e) =>
                      handleInput("color", e.target.value, "recolor")
                    }
                  />
                )}
              />
            )}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-4 ">
          <CustomField
            control={form.control}
            name="publicId"
            className=""
            render={({ field }) => (
              <ImageUpload
                publicId={field.value}
                onPublicIdChange={field.onChange}
                setImage={setImage}
              />
            )}
          />

          <TransformedImage
            image={image}
            isTransforming={transforming}
            transformationConfig={transformationConfig}
            setTransforming={setTransforming}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            className="submit-button mt-4 text-white"
            onClick={transformImage}
            disabled={transforming || newTransformation === null}
          >
            {!transforming ? (
              "Apply transformation"
            ) : (
              <div className="flex items-center">
                <p>Applying transformation...</p>
              </div>
            )}
          </Button>

          <Button
            className="submit-button mt-4 text-white flex items-center gap-2"
            disabled={newTransformation !== null || transforming}
          >
            <p className="">Save the image</p>
            <Image
              src={"/arrow.svg"}
              height={24}
              width={24}
              alt={"arrow"}
              className="invert"
            />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TransformationForm;
