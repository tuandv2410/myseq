import { ApiProperty } from "@nestjs/swagger";

export class genotype{
  @ApiProperty()
  genotypeId: string;
}

export class report {
  @ApiProperty()
  reportId: string;
  @ApiProperty()
  genotypes: genotype[];
}

export class DiseaseUserReportListViewDto{
  @ApiProperty()
  temp_id: string;
  @ApiProperty({required: false})
  report: report;
  @ApiProperty()
  level: number;
}