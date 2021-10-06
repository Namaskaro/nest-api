import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { MailService } from 'src/mail/mail.service';
import { DeleteResult, Repository } from 'typeorm';
import {
  CreateAccountDto,
  CreateAccountOutputDto,
} from './dtos/create.account.dto';
import { EditProfileDto, EditProfileOutputDto } from './dtos/edit.profile.dto';
import { LoginDto, LoginOutputDto } from './dtos/login.dto';
import {
  UserAccessKeyInput,
  UserAccessKeyOutput,
} from './dtos/user-acces-key.dto';
import { UserProfileOutputDto } from './dtos/user.profile.dto';
import { VerifyEmailOutputDto } from './dtos/verify-email.dto';
import { User } from './user.entity';
import { Verification } from './verification.entity';
import * as jwt from 'jsonwebtoken';
import { UnauthorizedUser } from './unauthorized-user.entity';
import { CreateUnauthorizedUserOutput } from './dtos/create-unauthorized-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,

    @InjectRepository(UnauthorizedUser)
    private readonly unauthorizedUsers: Repository<UnauthorizedUser>,

    @InjectRepository(Verification)
    private readonly verifications: Repository<Verification>,

    private readonly jwtService: JwtService,

    private readonly mailService: MailService,
  ) {}

  async createUserAccessKey(): Promise<CreateUnauthorizedUserOutput> {
    try {
      const privateKey = 'ma5sj39mg0vveqp2';
      const token = jwt.sign({ algorithm: 'RS256' }, privateKey, {
        expiresIn: '2h',
      });
      const unauthorizedUser = await this.unauthorizedUsers.create({
        userAccessKey: token,
      });
      await this.unauthorizedUsers.save(unauthorizedUser);
      // const token = await this.jwtService.create();

      return {
        ok: true,
        userAccessKey: token,
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  //Create new user account
  async createAccount({
    email,
    password,
    name,
  }: CreateAccountDto): Promise<CreateAccountOutputDto> {
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        return {
          ok: false,
          error: 'User with this email already exists',
        };
      }
      const user = await this.users.save(
        this.users.create({ email, password, name }),
      );
      const verification = await this.verifications.save(
        this.verifications.create({
          user,
        }),
      );
      this.mailService.sendVerificationEmail(user.email, verification.code);
      return { ok: true, user };
    } catch (e) {
      return { ok: false, error: "Couldn't create account" };
    }
  }

  //Login user
  async login({ email, password }: LoginDto): Promise<LoginOutputDto> {
    try {
      const user = await this.users.findOne(
        { email },
        { select: ['id', 'password'] },
      );
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Wrong password',
        };
      }

      const token = this.jwtService.sign(user.id);
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error: "Can't log user in.",
      };
    }
  }
  // Find user by ID

  async findById(id: number): Promise<UserProfileOutputDto> {
    try {
      const user = await this.users.findOneOrFail({ id });
      return {
        ok: true,
        user,
      };
    } catch (error) {
      return { ok: false, error: 'User Not Found' };
    }
  }

  // Delete user
  async delete(email: string): Promise<DeleteResult> {
    return await this.users.delete({ email: email });
  }

  //Edit user profile
  async editProfile(
    userId: number,
    { email, password, avatar }: EditProfileDto,
  ): Promise<EditProfileOutputDto> {
    try {
      const user = await this.users.findOne(userId);
      if (email) {
        user.email = email;
        user.verified = false;
        await this.verifications.delete({ user: { id: user.id } });
        const verification = await this.verifications.save(
          this.verifications.create({ user }),
        );
        this.mailService.sendVerificationEmail(user.email, verification.code);
      }
      if (password) {
        user.password = password;
      }
      await this.users.save(user);
      return {
        ok: true,
      };
    } catch (error) {
      return { ok: false, error: 'Could not update profile.' };
    }
  }

  //Verify user email
  async verifyEmail(code: string): Promise<VerifyEmailOutputDto> {
    try {
      const verification = await this.verifications.findOne(
        { code },
        { relations: ['user'] },
      );
      if (verification) {
        verification.user.verified = true;
        await this.users.save(verification.user);
        await this.verifications.delete(verification.id);
        return { ok: true };
      }
      return { ok: false, error: 'Verification not found.' };
    } catch (error) {
      return { ok: false, error: 'Could not verify email.' };
    }
  }
}
function userAccessKey(userAccessKey: any) {
  throw new Error('Function not implemented.');
}
