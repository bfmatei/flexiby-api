import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { UserInsertDto } from './dto/user-insert.dto';
import { UserDto } from './dto/user.dto';

import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserDto })
  insert(@Body() body: UserInsertDto): Observable<UserDto> {
    return this.usersService.insert(body);
  }
}
