// ------------------------------------------------------------------------------------
// This file is auto-generated, don't modify it manually or your changes will be lost.
// ------------------------------------------------------------------------------------
import { BaseDto } from './baseDto'

export interface ProductDto extends BaseDto {
  name?: string;
  code?: string;
  color?: string;
  voltageOrPowerCapacity?: string;
  size?: string;
  amount: number;
  price: number;
  detail?: string;
  categoryId: number;
  addedByUserId: number;
  image?: string;
  isWishList?: boolean;
}

