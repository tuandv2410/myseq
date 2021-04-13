import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from 'nestjsx-automapper';

export class ReportListDiseaseCategoryTrans {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}

export class ReportListDiseaseReportTrans {
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

export class ReportListDiseaseTemp {
  @ApiProperty()
  tempId: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: ReportListDiseaseReportTrans })
  diseaseReportTrans?: ReportListDiseaseReportTrans;

  @ApiProperty()
  level: number;
}
export class ReportListDiseaseDto {
  @ApiProperty()
  diseaseCategoryTrans: ReportListDiseaseCategoryTrans;

  @ApiProperty({ type: ReportListDiseaseTemp, isArray: true })
  diseaseTemp: ReportListDiseaseTemp[];
}
