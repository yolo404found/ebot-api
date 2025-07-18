import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  id: number;

  @Column({ unique: true, nullable: true })
  @ApiProperty({ example: '+1234567890', description: 'Admin phone number', required: false })
  phone: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'securePassword123', description: 'Hashed password', required: false })
  password: string;

  @Column({ unique: true })
  @ApiProperty({ example: '123456789', description: 'Telegram user ID' })
  telegram_id: string;

  @Column()
  @ApiProperty({ example: 'John Doe', description: 'Admin full name' })
  name: string;

  @Column({ default: false })
  @ApiProperty({ example: false, description: 'Is admin the owner?' })
  is_owner: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', description: 'Creation timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', description: 'Last update timestamp' })
  updated_at: Date;
}