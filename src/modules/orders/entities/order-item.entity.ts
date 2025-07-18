import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from './order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  id: number;

  @ManyToOne(() => Order, order => order.items)
  @JoinColumn({ name: 'order_id' })
  @ApiProperty({ type: () => Order, description: 'Related order' })
  order: Order;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  @ApiProperty({ type: () => Product, description: 'Ordered product' })
  product: Product;

  @Column('int')
  @ApiProperty({ example: 2, description: 'Product quantity' })
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty({ example: 49.99, description: 'Unit price at time of order' })
  price: number;
}