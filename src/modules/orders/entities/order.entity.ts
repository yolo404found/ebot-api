import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '../../customers/entities/customer.entity';
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @ApiProperty({ type: () => Customer, description: 'Customer who placed the order' })
  customer: Customer;

  @Column({
    type: 'enum',
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  })
  @ApiProperty({
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    example: 'pending',
    description: 'Current order status'
  })
  status: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty({ example: 99.99, description: 'Total order amount' })
  total: number;

  @Column('text', { nullable: true })
  @ApiProperty({ 
    example: 'Handle with care', 
    description: 'Order notes',
    required: false 
  })
  notes: string;

  @OneToMany(() => OrderItem, (item) => item.order)
  @ApiProperty({ 
    type: () => OrderItem, 
    isArray: true,
    description: 'Order items'
  })
  items: OrderItem[];

  @CreateDateColumn()
  @ApiProperty({ 
    example: '2023-01-01T00:00:00.000Z', 
    description: 'Creation timestamp' 
  })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({ 
    example: '2023-01-01T00:00:00.000Z', 
    description: 'Last update timestamp' 
  })
  updated_at: Date;
}