
import { nanoid } from "nanoid"
import { Table, Column, Model, DataType, PrimaryKey, AllowNull, Default, ForeignKey, BelongsTo, Validate, Index} from 'sequelize-typescript';
import { Account } from "./Account";
import { Product } from "./Product";


@Table({
    tableName:"opinions",
    timestamps:false
})
export class Opinion extends Model {
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
    @Index
    @Validate({
        min:1,
        max:5
    })
    @Column(DataType.SMALLINT())
    rating!:number

    @AllowNull(false)
    @Column(DataType.STRING(300))
    comment!:string
    
    @ForeignKey(() => Account)
    @Index
    accountId!:string;

    @BelongsTo(() => Account)
    account!:Account;
    
    @ForeignKey(() => Product)
    @Index
    productId!:string;

    @BelongsTo(() => Product)
    product!:Product
}