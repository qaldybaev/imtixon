
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { Status } from "../enum";

@Table({ tableName: "products", timestamps: true })
export class Product extends Model {
    @Column({ type: DataType.STRING })
    name: string
    @Column({ type: DataType.STRING })
    description: string
    @Column({ type: DataType.INTEGER })
    price: number
    @Column({ type: DataType.INTEGER })
    discount: number
    @Column({ type: DataType.SMALLINT })
    rating: number
    @Column({ type: DataType.INTEGER })
    stock: number
    @Column({
        type: DataType.ENUM,
        values: Object.values(Status),
        defaultValue: Status.active
    })
    status: Status
    @Column({allowNull:true})
    image_url: string
}