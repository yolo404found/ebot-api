import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({ example: 1, description: 'Product ID' })
  @IsNumber()
  @IsPositive()
  product_id: number;

  @ApiProperty({ example: 2, description: 'Quantity ordered' })
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiProperty({ example: 49.99, description: 'Unit price' })
  @IsNumber()
  @IsPositive()
  price: number;
}
  
export class CreateOrderDto {
  @ApiProperty({ example: 1, description: 'Customer ID' })
  @IsNumber()
  customer_id: number;

  @ApiProperty({ 
    type: () => [CreateOrderItemDto],
    example: [{ product_id: 1, quantity: 2, price: 49.99 }],
    description: 'Order items'
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];

  @ApiProperty({ 
    example: 'Handle with care', 
    description: 'Order notes',
    required: false 
  })
  @IsString()
  @IsOptional()
  notes?: string;
}