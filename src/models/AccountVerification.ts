
import { nanoid } from 'nanoid';
import { Table, Column, Model, DataType, PrimaryKey, AllowNull, Unique, Default, Index } from 'sequelize-typescript';

@Table({
    tableName:"accountsVerifications",
    timestamps:false
})
export class AccountVerification extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Default(() => nanoid())
    @Column(DataType.STRING(21))
    id!:string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING(75))
    email!:string;

    @AllowNull(false)
    @Column(DataType.CHAR(60))
    code!:string;

    @AllowNull(false)
    @Index
    @Default(DataType.NOW)
    @Column(DataType.DATE)
    createdAt!:Date

    @AllowNull(false)
    @Column(DataType.DATE())
    expireDate!:Date;
}