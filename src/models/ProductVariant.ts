
import {nanoid} from "nanoid"
import { Table, Column, Model, DataType, PrimaryKey, AllowNull, Unique, Default, ForeignKey, BelongsTo, HasMany, Index} from 'sequelize-typescript';
import { Product } from './Product';
import { Order } from './Order';

@Table({
    tableName:"products_variants",
    timestamps:true
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
    @Column(DataType.TEXT)
    description?:string;

    @AllowNull(false)
    @Index
    @Column(DataType.FLOAT(8, 2))
    price!:number;

    @AllowNull(true)
    @Column(DataType.FLOAT(8, 2))
    discountPrice?:number;

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