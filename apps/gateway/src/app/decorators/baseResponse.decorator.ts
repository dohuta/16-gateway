import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiBaseResponse = <TModel extends Type<unknown>>(props: {
  model?: TModel;
  dataType: 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object';
  description?: string;
}) => {
  let properties;
  if (
    props.dataType !== 'string' &&
    props.dataType !== 'number' &&
    props.dataType !== 'integer' &&
    props.dataType !== 'boolean'
  ) {
    properties = {
      status: { type: 'number' },
      message: { type: 'string' },
      data: {
        type: props.dataType,
      },
    };
  } else {
    properties = {
      status: { type: 'number' },
      message: { type: 'string' },
      data: {
        type: props.dataType,
        items: { $ref: getSchemaPath(props.model) },
      },
    };
  }

  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          // { $ref: getSchemaPath(BaseResponse) },
          {
            properties,
          },
        ],
      },
    })
  );
};
