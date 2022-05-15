import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { UsersController } from './controllers/user.controller';
import { NotesController } from './controllers/note.controller';

import { AuthGuard } from './Services/authGuard.service';
import { ConfigService } from './Services/config.service';

@Module({
  imports: [],
  controllers: [UsersController, NotesController],
  providers: [
    ConfigService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
