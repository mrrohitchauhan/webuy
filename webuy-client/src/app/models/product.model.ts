export class Products {
  category: string;
  name: string;
  price: number;
  subcategory: string;
  productimages: IImage[];
  productdetails: IProductDescription;
  isnew: boolean;
  onsale: boolean;
  isActive: boolean;
}

export interface IImage {
  imgurl: string;
  imgtype: boolean;
}

export interface IProductDescription {
  description: string;
  f_description: string;
  material: [{ material: string }];
  size: [{ size: string }];
}
