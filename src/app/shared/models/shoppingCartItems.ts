import { Quantity } from './quantity';
export class ShoppingCartItems{
    quantities: Quantity[] =[];
    totalCount: number =0;


    constructor(quantities: Quantity[]){
        this.quantities= quantities;      
    }

    get quantity(){
        let count = 0;
        
        for(let q in this.quantities){
            count += this.quantities[q].quantities;
            this.totalCount = count;
        }
        return count;
    }
}