import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto, UpdateOrderDto, CreateOrderItemDto } from './dto/index.dto';
import { CustomersService } from '../customers/customers.service';
import { ProductsService } from '../products/products.service';

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
    const customer = await this.customersService.findOne(createOrderDto.customer_id);
    const order = this.orderRepository.create({
      customer,
      notes: createOrderDto.notes,
      status: 'pending',
    });

    // Calculate total and create order items
    let total = 0;
    const items = await Promise.all(
      createOrderDto.items.map(async itemDto => {
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
    if(!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderRepository.findOne({ 
      where: { id },
      relations: ['customer', 'items', 'items.product'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    if (updateOrderDto.status) {
      order.status = updateOrderDto.status;
    }
    if (updateOrderDto.notes !== undefined) {
      order.notes = updateOrderDto.notes;
    }

    return this.orderRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}