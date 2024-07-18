import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Role } from "./role.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    userName: string;

    @Column({ default: null })
    userPassword: string;

    @OneToMany(() => Role, role => role.roleName)
    userRoles: string[];

    @Column({ default: false })
    locked: Boolean;

    @Column({ default: true })
    enabled: Boolean;

    @CreateDateColumn()
    createTime: Date;

    @UpdateDateColumn()
    updateTime: Date;

}