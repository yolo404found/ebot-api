import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto, UpdateAdminDto } from './dto/index.dto';
import { Admin } from './entities/admin.entity';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return this.adminsService.create(createAdminDto);
  }

  @Get()
  findAll(): Promise<Admin[]> {
    return this.adminsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Admin> {
    return this.adminsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto): Promise<Admin> {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.adminsService.remove(+id);
  }
}