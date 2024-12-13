import { BaseEntity } from "./../../common/config/base.entity";
import { CustomerEntity } from "./../../customers/entities/customer.entity";
import { EmployeeEntity } from "./../../employees/entities/employee.entity";
import { OrderDetailEntity } from "./../../order-details/entities/order-detail.entity";
import { ShipperEntity } from "./../../shippers/entities/shipper.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity("order")
export class OrderEntity extends BaseEntity{

    @Column({type: "date"})
    orderDate: Date

    @ManyToOne(() => CustomerEntity, (customer) => customer.orders)
    @JoinColumn({name: "customer_id"})
    customer: string;

    @ManyToOne(() => EmployeeEntity, (employee) => employee.orders)
    @JoinColumn({name: "employee_id"})
    employee: string;

    @ManyToOne(() => ShipperEntity, (shipper) => shipper.orders)
    @JoinColumn({name: "shipper_id"})
    shipper: string;

    @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.order)
    orderDetail: OrderDetailEntity[]
}
