import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsPositive, IsString } from "class-validator";
import { SortFields, SortOrder } from "../enum";
import { BadRequestException } from "@nestjs/common";

const acceptedFields = ['name', 'description', 'price', 'discount','rating','quantity'];

export class GetAllProductsDto {
     @ApiProperty({
    type: 'number',
    required: false,
    default: 1,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  page?: number;

  @ApiProperty({
    type: 'number',
    required: false,
    default: 10,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  limit?: number;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  

  @ApiProperty({ type: 'string', enum:SortFields , required: false })
  @IsOptional()
  @IsString()
  sortField?: SortFields;

  @ApiProperty({
    type: 'number',
    required: false,
    minimum: 1,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  minPrice?: number;

  @ApiProperty({
    type: 'number',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  maxPrice?: number;

  @ApiProperty({
    type: 'number',
    required: false,
    minimum: 1,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  minDiscount?: number;

  @ApiProperty({
    type: 'number',
    required: false,
    minimum: 1,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  maxDiscount?: number;

  @ApiProperty({
    type: 'number',
    required: false,
    minimum: 1,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  minRating?: number;

  @ApiProperty({
    type: 'number',
    required: false,
    minimum: 1,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  maxRating?: number;

  @ApiProperty({
    type: 'string',
    enum: SortOrder,
    default: SortOrder.ASC,
    required: false,
  })
  @IsOptional()
  @IsString()
  sortOrder?: SortOrder;

  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (!value?.length) return acceptedFields;
    else {
      const values: string[] = value.split(',');
      const isValid = values.every((el) => acceptedFields.includes(el));
      if (!isValid)
        throw new BadRequestException(`Xato ustun yuborildi: ${value}`);
      return values;
    }
  })
  @IsArray()
  fields?: string[];
}
