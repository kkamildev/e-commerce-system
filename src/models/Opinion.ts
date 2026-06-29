
import {nanoid} from "nanoid"
import { Table, Column, Model, DataType, PrimaryKey, AllowNull, Unique, Default, ForeignKey} from 'sequelize-typescript';
import { Account } from "./Account";


@Table({
    tableName:"opinions",
    timestamps:true
})
export class Opinion extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Default(() => nanoid())
    @Column(DataType.STRING(21))
    id!:string;

}