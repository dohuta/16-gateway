import { Sequelize } from 'sequelize-typescript';
import { Note, Token, User } from '@libs/db';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      // const sequelize = new Sequelize({
      //   dialect: 'mysql',
      //   host: process.env.DB_HOST,
      //   port: Number(process.env.DB_PORT || 3306),
      //   username: process.env.DB_USER,
      //   password: process.env.DB_PASS,
      //   database: process.env.DB_NAME,
      //   ssl: true,
      // });
      const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING || '');
      sequelize.addModels([User, Token, Note]);
      try {
        await sequelize.sync();
      } catch (error) {
        console.log(error);
      }
      return sequelize;
    },
  },
];
