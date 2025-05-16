import { ApiProperty } from "@nestjs/swagger"
import { Status } from "../enum"
import { IsEnum, IsNumberString, IsOptional, IsString } from "class-validator"
export class CreateProductDto {

    
    @ApiProperty({ type: 'string' })
    @IsString()
    name: string

    @ApiProperty({ type: 'string' })
    @IsString()
    description: string

    @ApiProperty({ type: "number" })
    @IsNumberString()
    price: number

    @ApiProperty({ type: "number" })
    @IsNumberString()
    discount: number

    @ApiProperty({ type: "number" })
    @IsNumberString()
    rating: number

    @ApiProperty({ type: "number" })
    @IsNumberString()
    stock: number

    @ApiProperty({
        type: 'string',
        enum: Status
    })
    @IsEnum(Status)
    status: Status

  
    @ApiProperty({type: "string", format: "binary" })
    image_url: Express.Multer.File
}
