import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from 'nestjsx-automapper';
import { DrugCategoryTransDto } from './drug-category.dto';

export class DrugCategoryByUserDto {
  @AutoMap()
  @ApiProperty()
  id: string;

  @AutoMap(() => DrugCategoryTransDto)
  @ApiProperty({ type: DrugCategoryTransDto, isArray: true })
  drugCategoryTrans: DrugCategoryTransDto[];

  @ApiProperty()
  new: boolean;

  @ApiProperty()
  missing: boolean;

  @ApiProperty()
  pending: boolean;
}
