
import { nanoid } from 'nanoid';
import { Table, Column, Model, DataType, PrimaryKey, AllowNull, ForeignKey, BelongsTo, Default } from 'sequelize-typescript';
import { Product } from './Product';

@Table({
    tableName:"products_properties",
    timestamps:false
})
export class ProductProperty extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Default(() => nanoid())
    @Column(DataType.STRING(21))
    id!:string;

    @AllowNull(false)
    @Column(DataType.STRING(20))
    name!:string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    note!:string;

    @ForeignKey(() => Product)
    productId!:string;

    @BelongsTo(() => Product)
    product!:Product

}