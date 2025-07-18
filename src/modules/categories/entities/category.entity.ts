import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/modules/products/entities/product.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  id: number;

  @Column()
  @ApiProperty({ example: 'Electronics', description: 'Category name' })
  name: string;

  @Column('text', { nullable: true })
  @ApiProperty({ 
    example: 'Electronic devices and accessories', 
    description: 'Category description',
    required: false 
  })
  description: string;

  @OneToMany(() => Product, product => product.category)
  @ApiProperty({ 
    type: () => Product, 
    isArray: true,
    description: 'Products belonging to this category',
    required: false 
  })
  products: Product[];

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