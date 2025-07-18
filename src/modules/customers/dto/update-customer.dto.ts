import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';

export class UpdateCustomerDto {
  @ApiProperty({ example: '+9876543210', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'John Smith', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ 
    example: '456 Second Ave, Town, Country', 
    required: false 
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ 
    enum: ['normal', 'VIP'],
    example: 'VIP',
    required: false
  })
  @IsOptional()
  @IsEnum(['normal', 'VIP'])
  customer_type?: 'normal' | 'VIP';
}