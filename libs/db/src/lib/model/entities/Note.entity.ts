import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { User } from './User.entity';

@Table
export class Note extends Model {
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column
  name: string;

  @Column
  content: string;

  @ForeignKey(() => User)
  @Column(DataTypes.UUID)
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
