import { Products } from "./products";

export interface IShoppingCart{
    id?: number;
    totalProducts?: number;
    dateTime?: string;
    products?: Products[];
}