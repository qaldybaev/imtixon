import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModel, ProductModel } from './modules';
import { JwtHelper } from './helper/jwt.helper';
import { APP_GUARD } from '@nestjs/core';
import { CheckAuthGuard, CheckRolesGuard } from './guards';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
  SequelizeModule.forRoot({
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    sync: {
      alter: true
    },
    autoLoadModels: true
  }),
    AuthModel,
    ProductModel
  ],
  providers: [
    JwtHelper,

    {
      provide: APP_GUARD,
      useClass: CheckAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: CheckRolesGuard,
    },
    
  ]


})
export class AppModule { }
