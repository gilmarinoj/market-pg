import { OrderEntity } from "./../../orders/entities/order.entity";
import { BaseEntity } from "./../../common/config/base.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity("employee")
export class EmployeeEntity extends BaseEntity {
    
    @Column({type: "varchar"})
    lastName: string;

    @Column({type: "varchar"})
    firstName: string;

    @Column({type: "date"})
    birthDate?: Date;

    @Column({type: "varchar"})
    city: string;

    @Column({type: "varchar"})
    phone: string;

    @Column({type: "varchar"})
    note: string

    @OneToMany(() => OrderEntity, (order) => order.employee)
    orders: OrderEntity[];
}
