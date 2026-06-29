
import { nanoid } from 'nanoid';

import { Table, Column, Model, DataType, PrimaryKey, AllowNull, Unique, Default, HasMany } from 'sequelize-typescript';
import { Opinion } from './Opinion';

@Table({
    tableName:"accounts",
    timestamps:false
})
export class Account extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Default(() => nanoid())
    @Column(DataType.STRING(21))
    id!:string;

    @AllowNull(false)
    @Column(DataType.STRING(50))
    name!:string;

    @AllowNull(false)
    @Column(DataType.STRING(50))
    surname!:string;

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
    @Unique
    @Column(DataType.STRING(75))
    email!:string;

    @HasMany(() => Opinion, {
        onDelete:"CASCADE",
        hooks:true
    })
    opinions!:Opinion[]
}