
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';
import { AuthGuard } from '../auth/auth.guard';
@Controller('clients')
export class ClientsController {
  constructor(private service: ClientsService) {}
  @UseGuards(AuthGuard)
  @Post()
create(@Body() body: Partial<Client>) {
  return this.service.create(body);
}
  @UseGuards(AuthGuard)
  @Get() list() { return this.service.findAll(); }
  @UseGuards(AuthGuard)
  @Get(':id') async detail(@Param('id') id: string) {
    const count = await this.service.incrementView(id);
    const client = await this.service.findOne(id);
    return { client, viewCount: count };
  }
  @UseGuards(AuthGuard)
  @Put(':id') update(@Param('id') id: string, @Body() body: Partial<Client>) { return this.service.update(id, body); }
  @UseGuards(AuthGuard)
  @Delete(':id') remove(@Param('id') id: string) { return this.service.softDelete(id); }
}
