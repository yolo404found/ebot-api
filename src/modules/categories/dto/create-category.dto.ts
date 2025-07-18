import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({ example: 'Electronics', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ 
    example: 'Electronic devices and accessories', 
    required: false 
  })
  @IsString()
  @IsOptional()
  description?: string;
}