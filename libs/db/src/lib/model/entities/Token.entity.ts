import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './User.entity';

@Table
export class Token extends Model {
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column
  token: string;

  @ForeignKey(() => User)
  @Column(DataTypes.UUID)
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
