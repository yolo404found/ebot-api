import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/index.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
          throw new NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    
    // return this.categoryRepository.findOne({ where: { id } });

    await this.categoryRepository.update(id, updateCategoryDto);
  
  const updatedCategory = await this.categoryRepository.findOne({ where: { id } });
  
  if (!updatedCategory) {
    throw new NotFoundException(`Category with ID ${id} not found`);
  }
  
  return updatedCategory;
  }

  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}