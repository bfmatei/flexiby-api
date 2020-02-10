import { Provider } from '@nestjs/common';

import { createRepository } from '~helpers/create-repository';

import { UserEntity } from './user.entity';

export const usersRepository: Provider = createRepository('user', UserEntity);
