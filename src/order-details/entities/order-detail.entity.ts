import { BaseEntity } from "./../../common/config/base.entity";
import { OrderEntity } from "./../../orders/entities/order.entity";
import { ProductEntity } from "./../../products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity("order_details")
export class OrderDetailEntity extends BaseEntity {

    @Column({type: "int"})
    quantity: number;

    @ManyToOne(() => OrderEntity, (order) => order.orderDetail)
    @JoinColumn({name: "order_id"})
    order: string;

    @ManyToOne(() => ProductEntity, (product) => product.orderDetails)
    @JoinColumn({name: "product_id"})
    product: string;

}
