import {
  Column,
  Model,
  Table,
  HasMany,
  Unique,
  AllowNull,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

import { Note } from './Note.entity';
import { Token } from './Token.entity';

@Table
export class User extends Model {
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Unique
  @AllowNull(false)
  @Column
  email: string;

  @Column
  password: string;

  @Column
  isConfirmed: boolean;

  @HasMany(() => Note)
  notes: Note[];

  @HasMany(() => Token)
  tokens: Token[];
}
