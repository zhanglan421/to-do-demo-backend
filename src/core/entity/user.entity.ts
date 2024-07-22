import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Role } from "./role.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    userName: string;

    @Column({ default: null })
    userPassword: string;

    @OneToMany(() => Role, role => role.user, { cascade: true })
    userRoles: Role[];

    @Column({ default: false })
    locked: Boolean;

    @Column({ default: true })
    enabled: Boolean;

    @CreateDateColumn()
    createTime: Date;

    @UpdateDateColumn()
    updateTime: Date;

}