import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

enum roleEnum { admin, user, guest }

@Entity()
export class Role{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.userRoles)
  roleName: roleEnum;
}