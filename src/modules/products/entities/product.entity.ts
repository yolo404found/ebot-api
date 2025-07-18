import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../categories/entities/category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  id: number;

  @Column()
  @ApiProperty({ example: 'Smartphone X', description: 'Product name' })
  name: string;

  @Column('text')
  @ApiProperty({ 
    example: 'Latest model with advanced features', 
    description: 'Product description' 
  })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty({ example: 599.99, description: 'Product price' })
  price: number;

  @Column('int')
  @ApiProperty({ example: 100, description: 'Available stock quantity' })
  stock: number;

  @Column('simple-array')
  @ApiProperty({ 
    example: ['image1.jpg', 'image2.jpg'],
    description: 'Array of product image URLs',
    type: [String]
  })
  images: string[];

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'category_id' })
  @ApiProperty({ type: () => Category, description: 'Product category' })
  category: Category;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({ 
    example: '2023-01-01T00:00:00.000Z', 
    description: 'Creation timestamp' 
  })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  @ApiProperty({ 
    example: '2023-01-01T00:00:00.000Z', 
    description: 'Last update timestamp' 
  })
  updated_at: Date;
}