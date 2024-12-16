import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.module';
import { User } from './User/user.entity';
import { Role } from './User/role.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // เปลี่ยนจาก 'db' เป็น 'localhost'
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'auth_db',
      entities: [User, Role],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}