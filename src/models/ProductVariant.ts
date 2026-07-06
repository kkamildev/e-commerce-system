
import { nanoid } from "nanoid"
import { Table, Column, Model, DataType, PrimaryKey, AllowNull, Default, ForeignKey, BelongsTo, HasMany, Index } from 'sequelize-typescript';
import { Product } from './Product';
import { Order } from './Order';

@Table({
    tableName:"productsVariants",
    timestamps:false
})

export class ProductVariant extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Default(() => nanoid())
    @Column(DataType.STRING(21))
    id!:string;

    @AllowNull(false)
    @Column(DataType.STRING(20))
    name!:string;

    @AllowNull(true)
    @Default(0)
    @Column(DataType.INTEGER)
    stock!:number;

    @AllowNull(true)
    @Column(DataType.STRING(250))
    description?:string;

    @AllowNull(false)
    @Index
    @Column(DataType.FLOAT(8, 2))
    price!:number;

    @ForeignKey(() => Product)
    @Index
    productId!:string;

    @BelongsTo(() => Product)
    product!: Product;

    @HasMany(() => Order, {
        onDelete:"CASCADE",
        hooks:true
    })
    orders!:Order[]
    
}