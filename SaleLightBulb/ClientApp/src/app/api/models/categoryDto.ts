// ------------------------------------------------------------------------------------
// This file is auto-generated, don't modify it manually or your changes will be lost.
// ------------------------------------------------------------------------------------
import { ProductDto } from './productDto';
import { BaseDto } from './baseDto'

export interface CategoryDto extends BaseDto {
  name?: string;
  products: ProductDto[];
}

