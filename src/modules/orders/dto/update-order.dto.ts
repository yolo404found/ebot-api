import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';

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
}