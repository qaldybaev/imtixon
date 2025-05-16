import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Product } from "./model";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { FsHelper } from "src/helper";

@Module({
    imports:[SequelizeModule.forFeature([Product])],
    controllers:[ProductController],
    providers:[ProductService,FsHelper]
})

export class ProductModel{}