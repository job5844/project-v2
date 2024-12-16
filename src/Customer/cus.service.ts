import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Cus} from './entity/cus.entity';

@Injectable()
export class CusService {
  constructor(
    @InjectRepository(Cus)
    private cusRepository: Repository<Cus>,
  ) {}

  async findAll(): Promise<Cus[]> {
    return this.cusRepository.find();
  }

  async findOne(cus_id: number): Promise<Cus> {
    return this.cusRepository.findOne({ where: { cus_id } });
  }

  async create(Cus: Partial<Cus>): Promise<Cus> {
    const newCus = this.cusRepository.create(Cus);
    return this.cusRepository.save(newCus);
  }

  async update(cus_id: number, Cus: Partial<Cus>): Promise<Cus> {
    await this.cusRepository.update(cus_id, Cus);
    return this.cusRepository.findOne({ where: { cus_id } });
  }

  async delete(cus_id: number): Promise<void> {
    await this.cusRepository.delete(cus_id);
  }
}