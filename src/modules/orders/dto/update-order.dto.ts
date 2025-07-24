import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from 'class-validator';
import { CreateOrderItemDto } from './create-order.dto';

export class UpdateOrderDto {
  @ApiProperty({ 
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    example: 'confirmed',
    description: 'Updated order status',
    required: false
  })
  @IsOptional()
  @IsEnum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'])
  status?: string;

  @ApiProperty({ 
    example: 'Updated delivery instructions', 
    description: 'Order notes',
    required: false 
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ 
    type: () => [CreateOrderItemDto],
    example: [{ product_id: 1, quantity: 2, price: 49.99 }],
    description: 'Order items',
    required: false
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @IsOptional()
  items?: CreateOrderItemDto[];
}