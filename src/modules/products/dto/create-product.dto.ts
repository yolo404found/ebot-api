import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsPositive, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Smartphone X', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ 
    example: 'Latest model with advanced features', 
    required: true 
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 599.99, required: true })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ example: 100, required: true })
  @IsNumber()
  @IsPositive()
  stock: number;

  @ApiProperty({ 
    example: ['image1.jpg', 'image2.jpg'], 
    required: true,
    type: [String]
  })
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ApiProperty({ example: 1, description: 'Category ID', required: true })
  @IsNumber()
  @IsPositive()
  category_id: number;
}