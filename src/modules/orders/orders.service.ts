// orders.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CustomersService } from '../customers/customers.service';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto,CreateOrderItemDto,UpdateOrderDto } from './dto/index.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    private customersService: CustomersService,
    private productsService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // Verify customer exists
    const customer = await this.customersService.findOne(createOrderDto.customer_id);
    
    // Create order base
    const order = this.orderRepository.create({
      customer,
      notes: createOrderDto.notes,
      status: 'pending',
    });

    // Process items and calculate total
    let total = 0;
    const items = await Promise.all(
      createOrderDto.items.map(async itemDto => {
        // Verify product exists
        const product = await this.productsService.findOne(itemDto.product_id);
        
        const itemTotal = itemDto.quantity * itemDto.price;
        total += itemTotal;

        return this.orderItemRepository.create({
          product,
          quantity: itemDto.quantity,
          price: itemDto.price,
        });
      }),
    );

    // Save order with items
    order.total = total;
    order.items = items;
    return this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({ 
      relations: ['customer', 'items', 'items.product'],
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ 
      where: { id },
      relations: ['customer', 'items', 'items.product'],
    });
    
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    
    if (updateOrderDto.status) {
      order.status = updateOrderDto.status;
    }
    
    if (updateOrderDto.notes !== undefined) {
      order.notes = updateOrderDto.notes;
    }

    return this.orderRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const result = await this.orderRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  }
}