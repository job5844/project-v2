// src/auth/dto/register.dto.ts
import { IsNotEmpty, IsString, Length, IsIn } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'กรุณากรอก username' })
  @Length(1, 15, { message: 'username ต้องมีความยาวไม่เกิน 15 ตัวอักษร' })
  username: string;

  @IsNotEmpty({ message: 'กรุณากรอกรหัสผ่าน' })
  @Length(6, 10, { message: 'รหัสผ่านต้องมีความยาว 6-10 ตัวอักษร' })
  password: string;

  @IsNotEmpty({ message: 'กรุณากรอกชื่อ' })
  firstname: string;

  @IsNotEmpty({ message: 'กรุณากรอกนามสกุล' })
  lastname: string;

  @IsNotEmpty({ message: 'กรุณากรอกเบอร์โทรศัพท์' })
  @Length(10, 10, { message: 'เบอร์โทรศัพท์ต้องมี 10 หลัก' })
  phone: string;

  @IsNotEmpty({ message: 'กรุณาเลือกประเภทผู้ใช้' })
  @IsIn(['USER', 'ADMIN'], { message: 'ประเภทผู้ใช้ไม่ถูกต้อง' })
  role: string;
}