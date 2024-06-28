import { IProduct } from "./Product";

export interface ICart{
    id?: string | number;
    product: IProduct;
}