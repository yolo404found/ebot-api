import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
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
    try {
      const customer = this.customerRepository.create(createCustomerDto);
      return await this.customerRepository.save(customer);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Phone number already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find({ relations: ['orders'] });
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ 
      where: { id },
      relations: ['orders']
    });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async findByPhone(phone: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ 
      where: { phone },
      relations: ['orders']
    });
    if (!customer) {
      throw new NotFoundException(`Customer with phone ${phone} not found`);
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const existing = await this.findOne(id);
    const updated = this.customerRepository.merge(existing, updateCustomerDto);
    
    try {
      return await this.customerRepository.save(updated);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Phone number already exists');
      }
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.customerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
  }
}