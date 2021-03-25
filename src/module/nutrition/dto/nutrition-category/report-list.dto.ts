import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";

export class ReportListNutritionCategoryTrans{

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}

export class ReportListNutritionReportTrans{
  @ApiProperty({required: false})
  reportId: string;

  @ApiProperty({required: false})
  draftConclusion?: string;

  @ApiProperty({required: false})
  finalConclusion?: string;
}

export class ReportListNutritionTemp{
  @ApiProperty()
  tempId: string;

  @ApiProperty()
  name: string;

  @ApiProperty({type: ReportListNutritionReportTrans})
  nutritionReportTrans?: ReportListNutritionReportTrans;

  @ApiProperty()
  level: number;
}
export class ReportListNutritionDto{
  @ApiProperty()
  nutritionCategoryTrans: ReportListNutritionCategoryTrans;

  @ApiProperty({type:ReportListNutritionTemp, isArray:true})
  nutritionTemp: ReportListNutritionTemp[];
}