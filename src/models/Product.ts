
import { Table, Column, Model, DataType, PrimaryKey, AllowNull, Unique, HasMany} from 'sequelize-typescript';
import { ProductVariant } from './ProductVariant';
import { ProductProperty } from './ProductProperty';

@Table({
    tableName:"products",
    timestamps:false
})
export class Product extends Model {
    @PrimaryKey
    @AllowNull(false)
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

    @HasMany(() => ProductVariant)
    productVariants!:ProductVariant[]

    @HasMany(() => ProductProperty)
    productProperties!:ProductProperty[]
}