import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { CusService } from './cus.service';
import { Cus } from './entity/cus.entity';

@Controller('Cus')
export class CusController {
  constructor(private readonly CusService: CusService) {}

  //get all users
  @Get()
  async findAll(): Promise<Cus[]> {
    console.log("cus.controller.ts");
    
    return this.CusService.findAll();
  }

  //get user by id
  @Get(':cus_id')
  async findOne(@Param('cus_id') cus_id: number): Promise<Cus> {
    const Cus = await this.CusService.findOne(cus_id);
    if (!Cus) {
      throw new NotFoundException('Cus does not exist!');
    } else {
      return Cus;
    }
  }

  //create user
  @Post()
  async create(@Body() Cus: Cus): Promise<Cus> {
    return this.CusService.create(Cus);
  }

  //update user
  @Put(':cus_id')
  async update (@Param('cus_id') cus_id: number, @Body() Cus: Cus): Promise<any> {
    return this.CusService.update(cus_id, Cus);
  }

  //delete user
  @Delete(':cus_id')
  async delete(@Param('cus_id') cus_id: number): Promise<any> {
    //handle error if user does not exist
    const Cus = await this.CusService.findOne(cus_id);
    if (!Cus) {
      throw new NotFoundException('User does not exist!');
    }
    return this.CusService.delete(cus_id);
  }
}
