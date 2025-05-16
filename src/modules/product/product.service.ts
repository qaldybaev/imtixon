import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Product } from "./model";
import { CreateProductDto, UpdateProductDto } from "./dtos";
import { FsHelper } from "src/helper";
import { where } from "sequelize";
@Injectable()
export class ProductService {

    constructor(@InjectModel(Product) private productModel: typeof Product, private fsHelper: FsHelper) { }

    async getAll() {
        const products = await this.productModel.findAll()

        return {
            message: "Barcha productlar",
            count: products.length,
            data: products
        }
    }

    async cerate(payload: CreateProductDto) {
        const image = await this.fsHelper.uploadFile(payload.image_url)
        const imageName = image.fileUrl.split("\\").pop()


        const newProduct = await this.productModel.create(
            {
                name: payload.name,
                description: payload.description,
                price: payload.price,
                rating: payload.rating,
                status: payload.status,
                stock: payload.stock,
                discount: payload.discount,
                image_url: imageName

            })

        return {
            message: "Yangi product yaratildi✅",
            data: newProduct
        }
    }

    async update(id: number, payload: UpdateProductDto) {
        const product = await this.productModel.findByPk(id)

        if (!product) {
            throw new NotFoundException(`ID: ${id} boyicha malumot topilmadi`)
        }

        const updateProduct = await this.productModel.update(
            {
                name: payload.name,
                description: payload.description,
                price: payload.price,
                rating: payload.rating,
                status: payload.status,
                stock: payload.stock,
                discount: payload.discount,
            }, { where: { id }, returning: true })

        return {
            message: "Product yangilandi",
            data: updateProduct
        }

    }

    async updateImage(id: number, image: Express.Multer.File) {

        const product = await this.productModel.findByPk(id)

        if (!product) {
            throw new NotFoundException(`ID: ${id} boyicha malumot topilmadi`)
        }

        if (product.dataValues.image_url) {
            await this.fsHelper.deleteFile(product.dataValues.image_url)
        }

        const image_url = await this.fsHelper.uploadFile(image)
        const imageName = image_url.fileUrl.split("\\").pop()

        const updateImage = await this.productModel.update({ image_url: imageName }, { where: { id }, returning: true })

        return {
            message: "Product image yangilandi",
            data: updateImage
        }

    }

    async deleteProduct(id: number) {

        const product = await this.productModel.findByPk(id)

        if (!product) {
            throw new NotFoundException(`ID: ${id} boyicha malumot topilmadi`)
        }

        if (product.dataValues.image_url) {
            await this.fsHelper.deleteFile(product.dataValues.image_url)
        }

        await this.productModel.destroy({ where: { id } })

        return {
            message:"Product o'chirildi"
        }
    }
}