import { Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Product } from "./model";
import { CreateProductDto, UpdateProductDto } from "./dtos";
import { FsHelper } from "src/helper";
import * as fs from "node:fs"
import * as path from "node:path";
import { Op } from "sequelize";
import { GetAllProductsDto } from "./dtos/get-all-product.dto";



@Injectable()
export class ProductService implements OnModuleInit {

    constructor(@InjectModel(Product) private productModel: typeof Product, private fsHelper: FsHelper) { }

    async onModuleInit() {
        this.seedProduct()
    }


    async getAll(query: GetAllProductsDto) {
        const filters: any = {};

        if (query.minPrice !== undefined) {
            filters.price = { [Op.gte]: query.minPrice };
        }
        if (query.maxPrice !== undefined) {
            filters.price = { ...filters.price, [Op.lte]: query.maxPrice };
        }

        if (query.minDiscount) {
            filters.discount = { [Op.gte]: query.minDiscount };
        }
        if (query.maxDiscount) {
            filters.discount = { ...filters.discount, [Op.lte]: query.maxDiscount };
        }
        if (query.minRating) {
            filters.rating = { [Op.gte]: query.minRating };
        }
        if (query.maxRating) {
            filters.rating = { ...filters.rating, [Op.lte]: query.maxRating };
        }

        const page = query.page ?? 1;
        const limit = query.limit ?? 10;

        const { count, rows: products } = await this.productModel.findAndCountAll({
            limit,
            offset: (page - 1) * limit,
            order: query.sortField
                ? [[query.sortField, query.sortOrder ?? 'ASC']]
                : undefined,
            where: filters,
            attributes: query.fields
        });
        return {
            count,
            page,
            limit,
            data: products
        }
    };




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
            message: "Product o'chirildi"
        }
    }

    async seedProduct() {
        const filePath = path.join(process.cwd(), 'src', 'data', 'MOCK_DATA.json');
        console.log(filePath)

        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const products = JSON.parse(fileContent);

            for (const product of products) {
                const exists = await this.productModel.findOne({ where: { name: product.name } });

                if (!exists) {
                    await this.productModel.create({
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        rating: product.rating,
                        status: product.status,
                        stock: product.stock,
                        discount: product.discount,
                        image_url: product.image_url || null
                    });
                }
            }

            console.log(`20 ta product qoshildi✅`);

        } catch (error) {
            console.error('seedProduct taratishda xatolik❌');
        }
    }

}