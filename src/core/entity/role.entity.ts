import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { IsNotEmpty } from 'class-validator';

export enum roleEnum {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roleName: roleEnum;

  @ManyToOne(() => User, (user) => user.userRoles)
  user: User;
}
