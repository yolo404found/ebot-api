import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto, UpdateAdminDto } from './dto/index.dto';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    try {
      const admin = this.adminRepository.create(createAdminDto);
      return await this.adminRepository.save(admin);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Duplicate telegram_id or phone number');
      }
      throw error;
    }
  }

  async findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const existing = await this.findOne(id);
    const updated = this.adminRepository.merge(existing, updateAdminDto);
    
    try {
      return await this.adminRepository.save(updated);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Duplicate phone number');
      }
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.adminRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
  }
}