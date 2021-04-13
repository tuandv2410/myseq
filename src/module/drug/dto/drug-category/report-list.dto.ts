import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from 'nestjsx-automapper';

export class ReportListDrugCategoryTrans {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}

export class ReportListDrugReportTrans {
  @ApiProperty({ required: false })
  reportId: string;

  @ApiProperty({ required: false })
  approve: boolean;

  @ApiProperty({ required: false })
  new: boolean;

  @ApiProperty({ required: false })
  draftConclusion?: string;

  @ApiProperty({ required: false })
  finalConclusion?: string;
}

export class ReportListDrugTemp {
  @ApiProperty()
  tempId: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: ReportListDrugReportTrans })
  drugReportTrans?: ReportListDrugReportTrans;

  @ApiProperty()
  level: number;
}
export class ReportListDrugDto {
  @ApiProperty()
  drugCategoryTrans: ReportListDrugCategoryTrans;

  @ApiProperty({ type: ReportListDrugTemp, isArray: true })
  drugTemp: ReportListDrugTemp[];
}
