import { type Link } from "@/types/types";

export const links: Link[] = [
  {
    name: "Home",
    route: "/",
    icon: "/home.svg",
  },

  {
    name: "Background Removal",
    route: "/transform/add/background_remove",
    icon: "/remove_back.svg",
  },
  {
    name: "Object Removal",
    route: "/transform/add/object_remove",
    icon: "/remove_photo.svg",
  },
  {
    name: "Gernerative Fill",
    route: "/transform/add/generative_fill",
    icon: "/fill2.svg",
  },
  {
    name: "Object Recolor",
    route: "/transform/add/object_recolor",
    icon: "/color_pal.svg",
  },
  {
    name: "Image Restoration",
    route: "/transform/add/image_restore",
    icon: "/image_rest.svg",
  },

  {
    name: "Profile",
    route: "/profile",
    icon: null,
  },
];

export const heroImages = [
  { id: 1, name: "/pexel1.jpg" },
  { id: 2, name: "/pexel2.jpg" },
  { id: 3, name: "/pexel3.jpg" },
  { id: 4, name: "/pexel4.jpg" },
];

export const plans = [
  {
    _id: 1,
    name: "Free",
    icon: "/assets/icons/free-plan.svg",
    price: 0,
    credits: 20,
    inclusions: [
      {
        label: "20 Free Credits",
        isIncluded: true,
      },
      {
        label: "Basic Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: false,
      },
      {
        label: "Priority Updates",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 2,
    name: "Pro Package",
    icon: "/assets/icons/free-plan.svg",
    price: 40,
    credits: 120,
    inclusions: [
      {
        label: "120 Credits",
        isIncluded: true,
      },
      {
        label: "Full Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: true,
      },
      {
        label: "Priority Updates",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 3,
    name: "Premium Package",
    icon: "/assets/icons/free-plan.svg",
    price: 199,
    credits: 2000,
    inclusions: [
      {
        label: "2000 Credits",
        isIncluded: true,
      },
      {
        label: "Full Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: true,
      },
      {
        label: "Priority Updates",
        isIncluded: true,
      },
    ],
  },
];

export const transformationTypes = {
  image_restore: {
    type: "image_restore",
    title: "Image Restoration",
    subTitle: "Refine images by removing noise and imperfections",
    config: { restore: true },
  },
  background_remove: {
    type: "background_remove",
    title: "Background Removal",
    subTitle: "Removes the background of the image",
    config: { removeBackground: true },
  },
  generative_fill: {
    type: "generative_fill",
    title: "Generative Fill",
    subTitle: "Enhance an image's dimensions",
    config: { fillBackground: true },
  },
  object_remove: {
    type: "object_remove",
    title: "Object Removal",
    subTitle: "Identify and eliminate objects from images",
    config: {
      remove: { prompt: "", removeShadow: true, multiple: true },
    },
  },
  object_recolor: {
    type: "object_recolor",
    title: "Object Recolor",
    subTitle: "Identify and recolor objects from the image",
    config: {
      recolor: { prompt: "", to: "", multiple: true },
    },
  },
};

export const aspectRatioOptions = {
  "1:1": {
    aspectRatio: "1:1",
    label: "Square (1:1)",
    width: 1000,
    height: 1000,
  },
  "3:4": {
    aspectRatio: "3:4",
    label: "Portrait (3:4)",
    width: 1000,
    height: 1334,
  },
  "9:16": {
    aspectRatio: "9:16",
    label: "Phone Portrait (9:16)",
    width: 1000,
    height: 1778,
  },
};

export const defaultValues = {
  title: "",
  aspectRatio: "",
  color: "",
  prompt: "",
  publicId: "",
};

export const creditFee = -1;
