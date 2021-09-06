import {
  Controller,
  Get,
  UseGuards,
  HttpStatus,
  Req,
  Post,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  //Facebook auth strategy
  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req: Request): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }

  //Google auth strategy

  @UseGuards(AuthGuard('google'))
  @Post('google/login')
  async login(@Req() req) {
    return this.authService.googleLogin(req.user);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request) {
    return this.authService.signInWithGoogle(req);
  }
}
