// ------------------------------------------------------------------------------------
// This file is auto-generated, don't modify it manually or your changes will be lost.
// ------------------------------------------------------------------------------------
import { ProductDto } from './productDto';
import { AddressDto } from './addressDto';
import { UserDto } from './userDto';
import { BaseDto } from './baseDto'

export interface OrderDto extends BaseDto {
  productId: number;
  addressId: number;
  orderByUserId: number;
  amount: number;
  product: ProductDto;
  address: AddressDto;
  orderByUser: UserDto;
}

