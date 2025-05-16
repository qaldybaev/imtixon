import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./auth.service";
import { LoginDto, RegisterDto } from "./dtos";

@Controller("auth")
export class UserController {
    constructor(private service: UserService) { }

    @Post("register")
    async register(@Body() body: RegisterDto) {
        return await this.service.register(body)
    }
    @Post("login")
    async login(@Body() body: LoginDto) {
        return await this.service.login(body)
    }
}