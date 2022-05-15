import {
  Controller,
  Inject,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { Authorization } from '../decorators/authorization.decorator';
import { BaseResponse, UpsertNotePayload, UpsertNoteReponse } from '@libs/dtos';
import { IAuthorizedRequest } from '../interfaces/ICommon';
import { ApiBaseResponse } from '../decorators/baseResponse.decorator';
import { AxiosBase } from '../Services/axios.service';

@Controller('notes') // endpoint
@ApiBearerAuth() // authentication
@ApiTags('notes') // document tag
export class NotesController {
  // logger declaration
  private readonly logger = new Logger(`GATEWAY::${NotesController.name}`);
  private noteService: AxiosBase;
  constructor() {
    this.noteService = new AxiosBase(process.env.NOTE_MS_URL, {
      'x-api-key': process.env.SECRET,
    });
  }

  @Get()
  @Authorization(true)
  @ApiBaseResponse({ model: UpsertNoteReponse, dataType: 'object' })
  public async getNotes(
    @Req() request: IAuthorizedRequest
  ): Promise<BaseResponse<UpsertNoteReponse[] | null>> {
    this.logger.log(`${this.getNotes.name} called::user id${request.user.id}`);

    const userInfo = request.user;

    const notesResponse: BaseResponse<UpsertNoteReponse[] | null> =
      await this.noteService.get('note_search_by_user_id', userInfo.id);

    this.logger.log(
      `${this.getNotes.name} responses::user id${request.user.id}::notes ${notesResponse.data.length}`
    );
    return notesResponse;
  }

  @Post()
  @Authorization(true)
  @ApiBaseResponse({ model: UpsertNoteReponse, dataType: 'object' })
  public async createNote(
    @Req() request: IAuthorizedRequest,
    @Body() noteRequest: UpsertNotePayload
  ): Promise<BaseResponse<UpsertNoteReponse | null>> {
    this.logger.log(
      `${this.createNote.name} called::user id${request.user.id}`
    );

    const userInfo = request.user;
    const createNoteResponse: BaseResponse<UpsertNoteReponse | null> =
      await this.noteService.post<UpsertNoteReponse | null>(
        'note_create',
        Object.assign(noteRequest, { user_id: userInfo.id })
      );

    if (createNoteResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: createNoteResponse.message,
          data: null,
        },
        createNoteResponse.status
      );
    }

    this.logger.log(
      `${this.createNote.name} responses::user id${request.user.id}::created ${createNoteResponse.status}`
    );

    return createNoteResponse;
  }

  @Delete(':id')
  @Authorization(true)
  @ApiBaseResponse({ dataType: 'boolean' })
  public async deleteNote(
    @Req() request: IAuthorizedRequest,
    @Param() params: { id: string }
  ): Promise<BaseResponse<Boolean>> {
    this.logger.log(
      `${this.deleteNote.name} called::user id${request.user.id}`
    );

    const userInfo = request.user;

    const deleteNoteResponse: BaseResponse<Boolean> =
      await this.noteService.post('note_delete_by_id', {
        id: params.id,
        userId: userInfo.id,
      });

    if (deleteNoteResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: deleteNoteResponse.message,
          data: false,
        },
        deleteNoteResponse.status
      );
    }

    this.logger.log(
      `${this.createNote.name} responses::user id${request.user.id}::deleted ${deleteNoteResponse.status}`
    );

    return deleteNoteResponse;
  }

  @Put(':id')
  @Authorization(true)
  @ApiBaseResponse({ dataType: 'boolean' })
  public async updateNote(
    @Req() request: IAuthorizedRequest,
    @Param() params: { id: string },
    @Body() noteRequest: UpsertNotePayload
  ): Promise<BaseResponse<UpsertNoteReponse | null>> {
    this.logger.log(
      `${this.updateNote.name} called::user id${request.user.id}`
    );

    const userInfo = request.user;
    const updateNoteResponse: BaseResponse<UpsertNoteReponse | null> =
      await this.noteService.post<UpsertNoteReponse | null>(
        'note_update_by_id',
        {
          id: params.id,
          userId: userInfo.id,
          note: noteRequest,
        }
      );

    if (updateNoteResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: updateNoteResponse.message,
          data: null,
        },
        updateNoteResponse.status
      );
    }

    this.logger.log(
      `${this.updateNote.name} responses::user id${request.user.id}::updated ${updateNoteResponse.status}`
    );
    return updateNoteResponse;
  }
}
