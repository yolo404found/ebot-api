// import { PartialType } from '@nestjs/swagger';
// import { CreateAdminDto } from './create-admin.dto';

import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

// export class UpdateAdminDto extends PartialType(CreateAdminDto) {}
export class UpdateAdminDto {
  @ApiProperty({ example: '+9876543210', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'newSecurePassword', required: false })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ example: 'John Smith', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  is_owner?: boolean;
}