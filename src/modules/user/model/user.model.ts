import { Column, DataType, Model, Table } from "sequelize-typescript";
import { UserRoles } from "../enum";

@Table({ tableName: "users", timestamps: true })
export class User extends Model {
    @Column({ type: DataType.STRING })
    name: string
    @Column({ type: DataType.STRING, unique: true })
    email: string
    @Column({ type: DataType.STRING })
    password: string
    @Column({
        type: DataType.ENUM,
        values: Object.values(UserRoles),
        defaultValue: UserRoles.USER
    })
    role: UserRoles
}