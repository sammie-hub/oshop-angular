import { OrderItem } from './orderItem';
import { Shipping } from './shipping';
export interface Order{
    datePlaced: string;
    oProducts: OrderItem[];
    totalOrderPrice: number;
    shippingDetails:Shipping;
}