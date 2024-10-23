// src/user/user.controller.ts
import { Controller, Post, Body, Delete, Param, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.register(
      createUserDto.email,
      createUserDto.password,
      createUserDto.name
    );
    return { message: '회원가입이 완료되었습니다.', userId: user.id };
  }

  @Delete('unregister/:id')
  @HttpCode(204)
  async unregister(@Param('id') id: string) {
    await this.userService.unregister(parseInt(id, 10));
  }
}