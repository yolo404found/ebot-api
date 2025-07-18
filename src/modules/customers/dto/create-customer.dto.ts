import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ example: '+1234567890', required: true })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'John Doe', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ 
    example: '123 Main St, City, Country', 
    required: true 
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ 
    enum: ['normal', 'VIP'],
    example: 'VIP',
    required: false
  })
  @IsOptional()
  @IsEnum(['normal', 'VIP'])
  customer_type?: 'normal' | 'VIP';
}