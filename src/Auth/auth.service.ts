import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../User/user.entity';
import { Role } from '../User/role.entity';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private jwtService: JwtService,
  ) {}

  private async ensureRolesExist() {
    try {
      console.log('Checking and creating roles...');
      
      const roles = [
        { roleId: 'R0001', roleName: 'USER' },
        { roleId: 'R0002', roleName: 'ADMIN' }
      ];

      for (const roleData of roles) {
        const existingRole = await this.roleRepository.findOne({
          where: { roleName: roleData.roleName }
        });

        if (!existingRole) {
          console.log(`Creating role: ${roleData.roleName}`);
          await this.roleRepository.save(roleData);
        }
      }
    } catch (error) {
      console.error('Error creating roles:', error);
      throw new Error('Failed to create roles');
    }
  }

  async register(registerDto: RegisterDto) {
    try {
      // สร้าง roles ก่อนถ้ายังไม่มี
      await this.ensureRolesExist();

      // เช็ค username ซ้ำ
      const existingUser = await this.userRepository.findOne({
        where: { cusUsername: registerDto.username }
      });

      if (existingUser) {
        throw new ConflictException('Username already exists');
      }

      // หา role ตามที่เลือก
      const role = await this.roleRepository.findOne({
        where: { roleName: registerDto.role }
      });

      if (!role) {
        throw new Error(`Role ${registerDto.role} not found`);
      }

      // เข้ารหัสรหัสผ่าน
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);

      // สร้าง user ID
      const userCount = await this.userRepository.count();
      const cusId = `U${String(userCount + 1).padStart(4, '0')}`;

      // สร้าง user ใหม่
      const newUser = this.userRepository.create({
        cusId,
        cusUsername: registerDto.username,
        cusPassword: hashedPassword,
        cusFirstname: registerDto.firstname,
        cusLastname: registerDto.lastname,
        cusPhone: registerDto.phone,
        roleId: role.roleId
      });

      await this.userRepository.save(newUser);

      return {
        message: 'User registered successfully',
        user: {
          cusId: newUser.cusId,
          username: newUser.cusUsername,
          firstname: newUser.cusFirstname,
          lastname: newUser.cusLastname,
          role: role.roleName
        }
      };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async login(username: string, password: string) {
    try {
      // ค้นหา user พร้อมกับข้อมูล role
      const user = await this.userRepository.findOne({
        where: { cusUsername: username },
        relations: ['role']
      });

      if (!user) {
        throw new UnauthorizedException('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      }

      // ตรวจสอบรหัสผ่าน
      const isPasswordValid = await bcrypt.compare(password, user.cusPassword);

      if (!isPasswordValid) {
        throw new UnauthorizedException('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      }

      // สร้าง token
      const payload = {
        sub: user.cusId,
        username: user.cusUsername,
        role: user.role.roleName
      };

      return {
        message: 'เข้าสู่ระบบสำเร็จ',
        user: {
          cusId: user.cusId,
          username: user.cusUsername,
          firstname: user.cusFirstname,
          lastname: user.cusLastname,
          role: user.role.roleName
        },
        access_token: this.jwtService.sign(payload)
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
}
  
