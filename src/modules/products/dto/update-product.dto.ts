import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsPositive, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ example: 'Smartphone X Pro', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ 
    example: 'Premium model with advanced features', 
    required: false 
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 699.99, required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({ example: 50, required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty({ 
    example: ['image1.jpg', 'image2.jpg', 'image3.jpg'], 
    required: false,
    type: [String]
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @ApiProperty({ example: 2, description: 'Category ID', required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  category_id?: number;
}