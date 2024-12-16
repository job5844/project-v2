// src/entities/user.entity.ts
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity('customers')
export class User {
  @PrimaryColumn({ name: 'cus_id', type: 'varchar', length: 10 }) // เปลี่ยนจาก char เป็น varchar
  cusId: string;

  @Column({ name: 'cus_username', type: 'varchar', length: 15 }) // เปลี่ยนจาก char เป็น varchar
  cusUsername: string;

  @Column({ name: 'cus_password', type: 'varchar', length: 60 }) // เพิ่มความยาวเพื่อรองรับ hashed password
  cusPassword: string;

  @Column({ name: 'cus_firstname', type: 'text' })
  cusFirstname: string;

  @Column({ name: 'cus_lastname', type: 'text' })
  cusLastname: string;

  @Column({ name: 'cus_phone', type: 'varchar', length: 10 }) // เปลี่ยนจาก char เป็น varchar
  cusPhone: string;

  @Column({ name: 'role_id', type: 'varchar', length: 5 }) // เปลี่ยนจาก char เป็น varchar
  roleId: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}