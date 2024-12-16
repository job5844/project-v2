import { Entity, PrimaryGeneratedColumn, Column,  } from "typeorm";

@Entity() 
export class Cus {
  @PrimaryGeneratedColumn()
  cus_id: number; // รหัสพนักงาน (Primary Key)

  @Column()
  cus_username: string; // ชื่อผู้ใช้

  @Column()
  cus_password: string; // รหัสผ่าน

  @Column()
  cus_firstname: string; // ชื่อ

  @Column()
  cus_lastname: string; // สกุล

  @Column()
  cus_phone: string; // เบอร์โทร

  @Column()
  role_id: string; // รหัสตำแหน่ง (Foreign Key)

  
}
