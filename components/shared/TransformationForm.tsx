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
import { aspectRatioOptions } from "@/const";
import { AspectRatioKey } from "@/lib/utils";
import { useEffect, useState } from "react";
import type { Transformations } from "@/types/types";
import { Separator } from "../ui/separator";
import { useDebounce } from "@/hooks/useDebounce";

export const formSchema = z.object({
  title: z.string(),
  color: z.string().optional(),
  aspectRatio: z.string(),
  prompt: z.string(),
});

type FormProps = {
  action: string;
  type: string;
  userId: string;
  data?: null;
  creditBalance: number;
};

const TransformationForm = ({
  action,
  type,
  userId,
  data = null,
  creditBalance,
}: FormProps) => {
  const [newTransformation, setNewTransformation] =
    useState<Transformations | null>(null);

  const [prompt, setPrompt] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [fieldName, setFieldName] = useState("");

  const debouncedValue = useDebounce(prompt, 1000);

  useEffect(() => {
    setNewTransformation((prevState: any) => ({
      [fieldType]: {
        ...prevState?.[fieldType],
        [fieldName === "prompt" ? "prompt" : "to"]: debouncedValue,
      },
    }));
  }, [debouncedValue, fieldType, fieldName]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onInputChangeHandler = (
    fieldName: string,
    value: string,
    type: string
  ) => {
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
        {type === "fill" ? (
          <CustomField
            render={({ field }) => (
              <Select>
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

        {(type === "remove" || type === "recolor") && (
          <div className="flex flex-col gap-4">
            <CustomField
              control={form.control}
              name="prompt"
              formLabel={
                type === "remove" ? "Object to remove" : "Object to recolor"
              }
              className="w-full"
              render={({ field }) => (
                <Input
                  value={field.value}
                  className="input-field"
                  onChange={(e) =>
                    onInputChangeHandler("prompt", e.target.value, type)
                  }
                />
              )}
            />

            {type === "recolor" && (
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
                      onInputChangeHandler("color", e.target.value, "recolor")
                    }
                  />
                )}
              />
            )}
            <Button className="submit-button mt-4 text-white" disabled={true}>
              Apply
            </Button>
            <Button
              className="submit-button mt-4 text-white"
              disabled={creditBalance <= 0}
            >
              <p className="">Save this image {"=>"}</p>
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default TransformationForm;
