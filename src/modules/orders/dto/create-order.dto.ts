export class CreateOrderItemDto {
    readonly product_id: number;
    readonly quantity: number;
    readonly price: number;
  }
  
  export class CreateOrderDto {
    readonly customer_id: number;
    readonly items: CreateOrderItemDto[];
    readonly notes?: string;
  }