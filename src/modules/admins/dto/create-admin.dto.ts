// src/admins/dto/create-admin.dto.ts
export class CreateAdminDto {
    readonly phone?: string;
    readonly password?: string;
    readonly telegram_id: string;
    readonly name: string;
    readonly is_owner?: boolean;
  }