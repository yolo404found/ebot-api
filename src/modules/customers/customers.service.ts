import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/index.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(createCustomerDto);
    return this.customerRepository.save(customer);
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async findByPhone(phone: string): Promise<Customer> {
    const customerByPhone = await this.customerRepository.findOne({ where: { phone } });
    if(!customerByPhone) {
      throw new NotFoundException(`Customer with phone ${phone} not found`);
    }
    return customerByPhone;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
   await this.customerRepository.update(id, updateCustomerDto);
    const updatedCustomer = await this.customerRepository.findOne({ where: { id } });
    if (!updatedCustomer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    } 
    return updatedCustomer;
  }

  async remove(id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }
}