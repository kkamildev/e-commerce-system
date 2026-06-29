
import { nanoid } from 'nanoid';
import { Table, Column, Model, DataType, PrimaryKey, AllowNull, ForeignKey, BelongsTo, Default, Index} from 'sequelize-typescript';
import { ProductVariant } from './ProductVariant';

@Table({
    tableName:"orders",
    timestamps:false
})
export class Order extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Default(() => nanoid())
    @Column(DataType.STRING(21))
    id!:string;

    @AllowNull(false)
    @Index
    @Default(DataType.NOW)
    @Column(DataType.DATE)
    createdAt!:Date

    @AllowNull(false)
    @Column(DataType.STRING(50))
    personName!:string;

    @AllowNull(false)
    @Column(DataType.STRING(50))
    personSurname!:string;

    @AllowNull(false)
    @Column(DataType.STRING(50))
    country!:string;

    @AllowNull(false)
    @Column(DataType.STRING(50))
    city!:string;

    @AllowNull(false)
    @Column(DataType.STRING(10))
    postalCode!:string;

    @AllowNull(false)
    @Column(DataType.STRING(75))
    street!:string;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    buildingNumber!:number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    unitNumber!:number;

    @AllowNull(false)
    @Column(DataType.STRING(75))
    email!:string;

    @ForeignKey(() => ProductVariant)
    @Index
    productVariantId!:string;

    @BelongsTo(() => ProductVariant)
    productVariant!: ProductVariant;
}