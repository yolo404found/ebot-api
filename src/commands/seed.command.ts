// src/seed/seed.command.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { SeedService } from '../database/seed/seed.service';

@Injectable()
export class SeedCommand implements OnModuleInit {
  constructor(private readonly seedService: SeedService) {}

  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    try {
      await this.seedService.seed();
      console.log('Database seeded successfully!');
      process.exit(0);
    } catch (error) {
      console.error('Seeding failed:', error);
      process.exit(1);
    }
  }
}