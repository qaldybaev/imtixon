import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class LoginDto {
    @ApiProperty({ type: "string" })
    @IsEmail()
    email: string
    @ApiProperty({ type: "string" })
    @IsString()
    password: string
}