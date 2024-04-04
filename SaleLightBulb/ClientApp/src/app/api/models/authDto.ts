// ------------------------------------------------------------------------------------
// This file is auto-generated, don't modify it manually or your changes will be lost.
// ------------------------------------------------------------------------------------
import { UserDto } from './userDto';

export interface AuthDto {
  currentUser: UserDto;
  accessToken?: string;
  expiresIn: number;
}

