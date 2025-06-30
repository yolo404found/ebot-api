export class CreateCustomerDto {
    readonly phone: string;
    readonly name: string;
    readonly address: string;
    readonly customer_type?: 'normal' | 'VIP';
  }