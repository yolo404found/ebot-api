import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/index.dto';
import { Customer } from './entities/customer.entity';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({ 
    status: 201, 
    description: 'Customer created successfully', 
    type: Customer 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request/Validation error' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Phone number already exists' 
  })
  create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of all customers', 
    type: [Customer] 
  })
  findAll(): Promise<Customer[]> {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get customer by ID' })
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  @ApiResponse({ 
    status: 200, 
    description: 'Customer found', 
    type: Customer 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Customer not found' 
  })
  findOne(@Param('id') id: string): Promise<Customer> {
    return this.customersService.findOne(+id);
  }

  @Get('phone/:phone')
  @ApiOperation({ summary: 'Get customer by phone number' })
  @ApiParam({ name: 'phone', type: 'string', example: '+1234567890' })
  @ApiResponse({ 
    status: 200, 
    description: 'Customer found', 
    type: Customer 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Customer not found' 
  })
  findByPhone(@Param('phone') phone: string): Promise<Customer> {
    return this.customersService.findByPhone(phone);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update customer by ID' })
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  @ApiResponse({ 
    status: 200, 
    description: 'Customer updated', 
    type: Customer 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Customer not found' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Phone number already exists' 
  })
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ): Promise<Customer> {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete customer by ID' })
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  @ApiResponse({ 
    status: 200, 
    description: 'Customer deleted successfully' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Customer not found' 
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.customersService.remove(+id);
  }
}