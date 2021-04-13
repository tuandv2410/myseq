import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from 'nestjsx-automapper';
import { DiseaseCategoryTransDto } from './disease-category.dto';

export class DiseaseCategoryByUserDto {
  @AutoMap()
  @ApiProperty()
  id: string;

  @AutoMap(() => DiseaseCategoryTransDto)
  @ApiProperty({ type: DiseaseCategoryTransDto, isArray: true })
  diseaseCategoryTrans: DiseaseCategoryTransDto[];

  @ApiProperty()
  new: boolean
}
