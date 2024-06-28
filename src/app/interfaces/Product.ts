export interface IProduct {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  desc: string;
  discount: string;
}

export interface ICart {
  id?: string | number;
  product: IProduct;
}
