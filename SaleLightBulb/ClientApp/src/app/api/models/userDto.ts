// ------------------------------------------------------------------------------------
// This file is auto-generated, don't modify it manually or your changes will be lost.
// ------------------------------------------------------------------------------------
import { Role } from './role';
import { AddressDto } from './addressDto';
import { BaseDto } from './baseDto'

export interface UserDto extends BaseDto {
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  role: Role;
  addresses: AddressDto[];
  cartLength: number;
}

