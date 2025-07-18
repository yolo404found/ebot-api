import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateCategoryDto {
  @ApiProperty({ example: 'Gadgets', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ 
    example: 'All electronic gadgets and devices', 
    required: false 
  })
  @IsString()
  @IsOptional()
  description?: string;
}