import { OrderEntity } from "./../../orders/entities/order.entity";
import { BaseEntity } from "./../../common/config/base.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity("shipper")
export class ShipperEntity extends BaseEntity {
    
    @Column({type: "varchar"})
    name: string;

    @Column({type: "varchar"})
    phone: string;

    @OneToMany(() => OrderEntity, (order) => order.shipper)
    orders: OrderEntity[];
}
