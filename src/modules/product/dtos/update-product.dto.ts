import { ApiProperty } from "@nestjs/swagger"
import { Status } from "../enum"
import { IsEnum, IsNumberString, IsOptional, IsString } from "class-validator"
export class UpdateProductDto {

    @IsOptional()
    @ApiProperty({ type: 'string' })
    @IsString()
    name?: string

    @IsOptional()
    @ApiProperty({ type: 'string' })
    @IsString()
    description?: string

    @IsOptional()
    @ApiProperty({ type: "number" })
    @IsNumberString()
    price?: number

    @IsOptional()
    @ApiProperty({ type: "number" })
    @IsNumberString()
    discount?: number

    @IsOptional()
    @ApiProperty({ type: "number" })
    @IsNumberString()
    rating?: number

    @IsOptional()
    @ApiProperty({ type: "number" })
    @IsNumberString()
    stock?: number

    @IsOptional()
    @ApiProperty({
        type: 'string',
        enum: Status
    })
    @IsEnum(Status)
    status?: Status
  
}
