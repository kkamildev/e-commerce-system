
import { nanoid } from 'nanoid';
import { Table, Column, Model, DataType, PrimaryKey, AllowNull, Unique, HasMany, Default} from 'sequelize-typescript';
import { ProductVariant } from './ProductVariant';
import { ProductProperty } from './ProductProperty';
import { Opinion } from './Opinion';

@Table({
    tableName:"products",
    timestamps:false
})
export class Product extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Default(() => nanoid())
    @Column(DataType.STRING(21))
    id!:string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING(50))
    fullname!:string;

    @AllowNull(true)
    @Column(DataType.TEXT)
    description?:string;

    @AllowNull(true)
    @Column(DataType.STRING(20))
    deliveryNote?:string;

    @HasMany(() => ProductVariant, {
        onDelete:"CASCADE",
        hooks:true
    })
    productVariants!:ProductVariant[]

    @HasMany(() => ProductProperty, {
        onDelete:"CASCADE",
        hooks:true
    })
    productProperties!:ProductProperty[]

    @HasMany(() => Opinion, {
        onDelete:"CASCADE",
        hooks:true
    })
    opinions!:Opinion[]
}