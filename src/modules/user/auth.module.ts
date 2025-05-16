import { Module } from "@nestjs/common";
import { UserController } from "./auth.controller";
import { UserService } from "./auth.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./model";
import { JwtHelper } from "src/helper/jwt.helper";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [SequelizeModule.forFeature([User]),
    JwtModule.register({
        global: true,
        secret: "secret"
    }),],
    controllers: [UserController],
    providers: [UserService, JwtHelper]
})
export class AuthModel { }