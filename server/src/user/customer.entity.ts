import { Entity, PrimaryColumn, OneToOne, JoinColumn, Column } from "typeorm";
import { User } from "./user.entity";

@Entity() 
export class Customer {
    @PrimaryColumn()
    @OneToOne(type => User, user => user.customerInfo)
    @JoinColumn()
    user: User;

    @Column()
    phone: string;
}