import { Column, Entity } from 'typeorm';

import { BaseEntity } from '~helpers/base-entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ nullable: false, length: 100 })
  firstName: string;

  @Column({ nullable: false, length: 100 })
  lastName: string;

  @Column({ unique: true, nullable: false, length: 300 })
  email: string;

  @Column({ unique: true, nullable: false, length: 100 })
  username: string;

  @Column({ nullable: false, length: 60 })
  password: string;
}
