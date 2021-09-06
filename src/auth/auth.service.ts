import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { GoogleUser } from './google.user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(GoogleUser)
    private readonly users: Repository<GoogleUser>,
  ) {}
  googleLogin(user: GoogleUser) {
    if (!user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user,
    };
  }

  async signInWithGoogle(req) {
    if (!req.user) throw new BadRequestException();

    let user = await this.users.find({
      where: [{ googleId: req.user.id }],
    })[0];
    if (user) return this.googleLogin(user);

    //   user = await this.users.findOneOrFail({ email: req.user.email });
    //   if (user)
    //     throw new ForbiddenException(
    //       "User already exists, but Google account was not connected to user's account",
    //     );
    try {
      const newUser = new GoogleUser();
      newUser.firstName = req.user.firstName;
      newUser.lastName = req.user.lastName;
      newUser.email = req.user.email;
      newUser.avatar = req.user.picture;
      newUser.googleId = req.user.id;

      await this.users.save(newUser);

      return this.googleLogin(newUser);
    } catch (e) {
      throw new Error(e);
    }
  }
}
