import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAdminDto {
  @ApiProperty({ example: '+1234567890', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'securePassword123', required: false })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ example: '123456789', required: true })
  @IsString()
  @IsNotEmpty()
  telegram_id: string;

  @ApiProperty({ example: 'John Doe', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  is_owner?: boolean;
}