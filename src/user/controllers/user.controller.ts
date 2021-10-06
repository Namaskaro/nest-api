import { CreateAccountOutputDto } from './../dtos/create.account.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../user.service';
import { CreateAccountDto } from '../dtos/create.account.dto';
import { LoginDto, LoginOutputDto } from '../dtos/login.dto';
import { User } from '../user.entity';
import { EditProfileDto } from '../dtos/edit.profile.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { CurrentUser } from 'src/auth/auth-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { extname } from 'path';
import { Response, Request } from 'express';

export const storage = {
  storage: diskStorage({
    destination: './uploads/avatar',

    filename: (req, file, cb) => {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      return cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
};

@ApiTags('User')
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  SERVER_URL: string = 'http://localhost:3000/';

  @Post('user/login')
  async login(@Body() loginDto: LoginDto): Promise<LoginOutputDto> {
    return await this.userService.login(loginDto);
  }

  @Post('user/register')
  async register(@Body() createAccountDto: CreateAccountDto) {
    return await this.userService.createAccount(createAccountDto);
  }

  @Delete('user/delete/:slug')
  async delete(@Param() params) {
    return await this.userService.delete(params.slug);
  }

  @Put('user/update')
  async update(userId: number, @Body('user') editProfileDto: EditProfileDto) {
    return await this.userService.editProfile(userId, editProfileDto);
  }

  // @UseGuards(AuthGuard())
  @Post('api/upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',

        filename: (Request, file, cb) => {
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${name}-${randomName}${fileExtName}`);
        },
      }),
    }),
  )
  uploadAvatar(@UploadedFile() file) {
    const avatarUrl = file.path.replace('\\', '/');
    return {
      url: `http://localhost:3000/${avatarUrl}`,
    };
  }

  // @UseGuards(AuthGuard())
  @Get('uploads/:path')
  async getAvatar(@Param('path') path, @Res() res: Response): Promise<any> {
    res.sendFile(path, { root: 'uploads' });
  }

  @Post('user/token')
  async generateToken(): Promise<any> {
    return await this.userService.createUserAccessKey();
  }
}
