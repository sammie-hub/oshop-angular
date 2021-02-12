import { Products } from "./products";

export class ShoppingCartSubject{
    
    private condition:boolean;
    private lProducts:Products[];

    constructor(lproducts?: Products[]){

    }

    set listProducts(lProducts:Products[]){
        this.lProducts = lProducts;
    }

    get listProducts(){
        return this.lProducts;
    }

    set Condition(val:boolean){
        this.condition = val;
    }

    get Condition(){
        return this.condition;
    }

    getQuantity(){
        let cartCount:number = 0;
        this.lProducts.forEach(r=> cartCount+=r.quantity);
        return cartCount;
    }

    getTotalPrice(){
        let totalPrice:number = 0;
        this.listProducts.forEach(r=> totalPrice+=(r.price * r.quantity));
        return totalPrice;
    }
}