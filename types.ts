export type ProductData = {
  price: number;
  _createdAt: string;
  _rev: string;
  name: string;
  _updatedAt: string;
  image: Image[];
  _type: string;
  details: string;
  _id: string;
  slug: Slug;
  quantity?: number;
};

export type Image = {
  _type: string;
  _key?: string;
  asset: Asset;
};

export type Asset = {
  _ref: string;
  _type: string;
};

export type Slug = {
  current: string;
  _type: string;
};

export type BannerData = {
  image: Image;
  _rev: string;
  midText: string;
  smallText: string;
  _createdAt: string;
  _id: string;
  largeText2: string;
  _type: string;
  desc: string;
  buttonText: string;
  product: string;
  discount: string;
  saleTime: string;
  largeText1: string;
  _updatedAt: string;
};
