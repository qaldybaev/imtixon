import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto, UpdateProductDto } from "./dtos";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes } from "@nestjs/swagger";
import { UpdateProductImageDto } from "./dtos/updateImage.dto";


@Controller("products")
export class ProductController {
    constructor(private service: ProductService) { }

    @Get()
    async getAll() {
        return await this.service.getAll()
    }

    @Post()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor("image_url"))
    async create(@Body() body: CreateProductDto, @UploadedFile() image_url: Express.Multer.File) {

        return await this.service.cerate({ ...body, image_url })

    }

    @Patch(":id")
    async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductDto) {
        return await this.service.update(id, body)
    }

    @Put(':id/image')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor("image_url"))
    async updateImage(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductImageDto, @UploadedFile() image_url: Express.Multer.File) {
        return await this.service.updateImage(id, image_url)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.service.deleteProduct(id)
    }

}