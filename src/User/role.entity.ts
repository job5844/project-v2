// src/entities/role.entity.ts
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('roles')
export class Role {
  @PrimaryColumn({ name: 'role_id', type: 'varchar', length: 5 }) // เปลี่ยนจาก char เป็น varchar
  roleId: string;

  @Column({ name: 'role_name', type: 'varchar', length: 255 })
  roleName: string;

  @OneToMany(() => User, user => user.role)
  users: User[];
}