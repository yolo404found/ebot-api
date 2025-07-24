import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Order } from './entities/order.entity';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ 
    status: 201, 
    description: 'Order created successfully', 
    type: Order 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid input data' 
  })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of all orders', 
    type: [Order] 
  })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Order details', 
    type: Order 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Order not found' 
  })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update order' })
  @ApiResponse({ 
    status: 200, 
    description: 'Order updated successfully', 
    type: Order 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Order not found' 
  })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete order' })
  @ApiResponse({ 
    status: 200, 
    description: 'Order deleted successfully' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Order not found' 
  })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}