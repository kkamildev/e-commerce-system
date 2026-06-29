import { Table, Column, Model, DataType, PrimaryKey, AllowNull, Default } from 'sequelize-typescript';

@Table({
  tableName: "config",
  timestamps: false
})
export class Config extends Model {
    @PrimaryKey
    @Default(0)
    @AllowNull(false)
    @Column(DataType.TINYINT)
    id!: number;

    @Default("e-commerce")
    @AllowNull(false)
    @Column(DataType.STRING(30))
    storeName!:string;

    @Default("Just a store")
    @AllowNull(false)
    @Column(DataType.STRING(255))
    storeDescription!:string;

    @Default("Welcome")
    @AllowNull(false)
    @Column(DataType.STRING(30))
    mainPageTitle!:string;

    @Default("To our shop")
    @AllowNull(false)
    @Column(DataType.STRING(50))
    mainPageSubtitle!:string;
}