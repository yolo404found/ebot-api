import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CustomersService } from '../customers/customers.service';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

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
      total: 0,
      items: []
    });

    let total = 0;
    order.items = await Promise.all(
      createOrderDto.items.map(async itemDto => {
        const product = await this.productsService.findOne(itemDto.product_id);
        const itemTotal = itemDto.quantity * itemDto.price;
        total += itemTotal;

        return this.orderItemRepository.create({
          product,
          quantity: itemDto.quantity,
          price: itemDto.price
        });
      })
    );

    order.total = total;
    return this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: {
        customer: true,
        items: {
          product: true
        }
      },
      order: {
        created_at: 'DESC'
      }
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: {
        customer: true,
        items: {
          product: true
        }
      }
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    
    // Update basic fields
    if (updateOrderDto.status) {
      order.status = updateOrderDto.status;
    }
    
    if (updateOrderDto.notes !== undefined) {
      order.notes = updateOrderDto.notes;
    }

    // Update items if provided
    if (updateOrderDto.items) {
      // Remove existing items
      await this.orderItemRepository.delete({ order: { id } });

      // Add new items
      let total = 0;
      order.items = await Promise.all(
        updateOrderDto.items.map(async itemDto => {
          const product = await this.productsService.findOne(itemDto.product_id);
          const itemTotal = itemDto.quantity * itemDto.price;
          total += itemTotal;

          return this.orderItemRepository.create({
            order: { id },
            product,
            quantity: itemDto.quantity,
            price: itemDto.price
          });
        })
      );

      // Save new items
      order.items = await this.orderItemRepository.save(order.items);
      order.total = total;
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