
import { Table, Column, Model, DataType, PrimaryKey, AllowNull, AutoIncrement } from 'sequelize-typescript';

@Table({
    tableName:"users",
    timestamps:false
})
export class User extends Model {
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!:number;

    @AllowNull(false)
    @Column(DataType.STRING(50))
    username!:string;

    @AllowNull(false)
    @Column(DataType.STRING(75))
    email!:string;

    @AllowNull(false)
    @Column(DataType.STRING(60))
    password!:string;

    @AllowNull(false)
    @Column(DataType.ENUM("Admin", "Product_manager", "Sales_manager", "Producer"))
    role!:string;
}