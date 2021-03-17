import { ResultInterface } from 'src/interfaces/result.interface';
import { UserDto } from '../../user/dto/user.dto';
import { CreateDiseaseReportDto } from '../dto/disease-report/create-disease-report.dto';
import { DiseaseReportDto } from '../dto/disease-report/disease-report.dto';
import { FilterDiseaseReportDto } from '../dto/disease-report/filter-disease-report.dto';
import { UpdateDiseaseReportDto } from '../dto/disease-report/update-disease-report.dto';
import { CreateGenotypeDiseaseReportDto } from '../dto/genotype-disease-report/create-genotype-disease-report.dto';
import { FilterGenotypeDiseaseReportDto } from '../dto/genotype-disease-report/filter-genotype-disease-report.dto';
import { GenotypeDiseaseReportDto } from '../dto/genotype-disease-report/genotype-disease-report.dto';
import { DiseaseReportService } from '../service/disease-report.service';
export declare class DiseaseReportController {
    private readonly diseaseReportService;
    constructor(diseaseReportService: DiseaseReportService);
    getAllDiseaseReport(userId: string, filterDto: FilterDiseaseReportDto, user: UserDto): Promise<DiseaseReportDto[]>;
    getDiseaseReportById(userId: string, filterDto: FilterDiseaseReportDto, diseaseReportId: string, user: UserDto): Promise<DiseaseReportDto>;
    createDiseaseReport(userId: string, userData: CreateDiseaseReportDto, user: UserDto): Promise<DiseaseReportDto>;
    updateDiseaseReport(userId: string, diseaseReportId: string, userData: UpdateDiseaseReportDto, user: UserDto): Promise<DiseaseReportDto>;
    approveDiseaseReport(userId: string, diseaseReportId: string, user: UserDto): Promise<DiseaseReportDto>;
    deleteDiseaseReport(userId: string, diseaseReportId: string, user: UserDto): Promise<ResultInterface>;
    createGenotypeDiseaseReport(diseaseReportId: string, userData: CreateGenotypeDiseaseReportDto, user: UserDto): Promise<GenotypeDiseaseReportDto>;
    getAllGenotypeDiseaseReport(diseaseReportId: string, filterDto: FilterGenotypeDiseaseReportDto, user: UserDto): Promise<GenotypeDiseaseReportDto[]>;
}
