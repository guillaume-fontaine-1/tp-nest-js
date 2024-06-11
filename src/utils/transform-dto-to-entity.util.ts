import { plainToClass } from 'class-transformer';

export function transformDtoToEntity(dto: any, entity: any): any {
  return plainToClass(entity, dto);
}
