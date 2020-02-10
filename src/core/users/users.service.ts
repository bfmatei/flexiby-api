import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { UserInsertDto } from './dto/user-insert.dto';
import { UserDto } from './dto/user.dto';

import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  private readonly passwordRounds: number;

  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService
  ) {
    this.passwordRounds = Number(
      this.configService.get<string>('PASSWORD_ROUNDS')
    );
  }

  async existsByUsername(username: string): Promise<boolean> {
    return (
      (await this.userRepository.count({
        where: {
          username
        }
      })) > 0
    );
  }

  async existsByEmail(email: string): Promise<boolean> {
    return (
      (await this.userRepository.count({
        where: {
          email
        }
      })) > 0
    );
  }

  async insert(user: UserInsertDto): Promise<UserDto> {
    if (await this.existsByEmail(user.email)) {
      throw new BadRequestException('Email is used');
    }

    if (await this.existsByUsername(user.username)) {
      throw new BadRequestException('Username is used');
    }

    const result = this.userRepository.create({
      ...user,
      password: await bcrypt.hash(
        user.password,
        await bcrypt.genSalt(this.passwordRounds)
      )
    });

    const dbUser = await this.userRepository.save(result);

    return this.entityToDto(dbUser);
  }

  async findOneById(id: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id
      }
    });
  }

  async findOneByUsername(username: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        username
      }
    });
  }

  entityToDto(user: UserEntity): UserDto {
    return user
      ? {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username
        }
      : null;
  }
}
