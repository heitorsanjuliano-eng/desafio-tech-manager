
import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ClientsService } from './clients.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';
@Module({
  imports: [TypeOrmModule.forFeature([Client]), JwtModule.register({ secret: process.env.JWT_SECRET || 'changeme' })],
  controllers: [ClientsController],
  providers: [ClientsService, AuthGuard]
})
export class ClientsModule {}
