import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto, UpdateProductDto } from "./dtos";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiConsumes } from "@nestjs/swagger";
import { UpdateProductImageDto } from "./dtos/updateImage.dto";
import { Protected, Roles } from "src/decorators";
import { UserRoles } from "../user";
import { GetAllProductsDto } from "./dtos/get-all-product.dto";


@Controller("products")
export class ProductController {
    constructor(private service: ProductService) { }


    @Get()
    @Protected(false)
    @Roles([UserRoles.ADMIN, UserRoles.USER])
    async getAll(@Query() query:GetAllProductsDto) {
        return await this.service.getAll(query)
    }

    @Post()
    @ApiBearerAuth()
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor("image_url"))
    async create(@Body() body: CreateProductDto, @UploadedFile() image_url: Express.Multer.File) {

        return await this.service.cerate({ ...body, image_url })

    }

    @Patch(":id")
    @ApiBearerAuth()
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductDto) {
        return await this.service.update(id, body)
    }

    @Put(':id/image')
    @ApiBearerAuth()
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor("image_url"))
    async updateImage(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductImageDto, @UploadedFile() image_url: Express.Multer.File) {
        return await this.service.updateImage(id, image_url)
    }

    @Delete(':id')
    @ApiBearerAuth()
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.service.deleteProduct(id)
    }

}