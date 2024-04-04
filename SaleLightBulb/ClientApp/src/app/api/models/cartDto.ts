// ------------------------------------------------------------------------------------
// This file is auto-generated, don't modify it manually or your changes will be lost.
// ------------------------------------------------------------------------------------
import { ProductDto } from './productDto';
import { UserDto } from './userDto';
import { BaseDto } from './baseDto'

export interface CartDto extends BaseDto {
  productId: number;
  userId: number;
  amount: number;
  product: ProductDto;
  user: UserDto;
}

