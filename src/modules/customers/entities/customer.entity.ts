import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../../orders/entities/order.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ 
    example: '+1234567890', 
    description: 'Customer phone number (unique)' 
  })
  phone: string;

  @Column()
  @ApiProperty({ example: 'John Doe', description: 'Customer full name' })
  name: string;

  @Column()
  @ApiProperty({ 
    example: '123 Main St, City, Country', 
    description: 'Customer address' 
  })
  address: string;

  @Column({ 
    type: 'enum', 
    enum: ['normal', 'VIP'], 
    default: 'normal' 
  })
  @ApiProperty({ 
    enum: ['normal', 'VIP'],
    example: 'VIP',
    description: 'Customer type',
    default: 'normal'
  })
  customer_type: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({ 
    example: '2023-01-01T00:00:00.000Z', 
    description: 'Creation timestamp' 
  })
  created_at: Date;

  @Column({ 
    type: 'timestamp', 
    default: () => 'CURRENT_TIMESTAMP', 
    onUpdate: 'CURRENT_TIMESTAMP' 
  })
  @ApiProperty({ 
    example: '2023-01-01T00:00:00.000Z', 
    description: 'Last update timestamp' 
  })
  updated_at: Date;

  @OneToMany(() => Order, order => order.customer)
  @ApiProperty({
    type: () => Order,
    isArray: true,
    description: 'Customer orders',
    required: false
  })
  orders: Order[];
}