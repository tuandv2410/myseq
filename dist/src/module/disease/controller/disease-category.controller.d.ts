import { ResultInterface } from 'src/interfaces/result.interface';
import { UserDto } from '../../user/dto/user.dto';
import { CreateDiseaseCategoryDto } from '../dto/disease-category/create-disease-category.dto';
import { DiseaseCategoryDto } from '../dto/disease-category/disease-category.dto';
import { FilterDiseaseCategoryDto } from '../dto/disease-category/filter-disease-category.dto';
import { UpdateDiseaseCategoryDto } from '../dto/disease-category/update-disease-category.dto';
import { DiseaseUserReportListViewDto } from '../dto/disease-temp/disease-user-report-list-view.dto';
import { DiseaseCategoryService } from '../service/disease-category.service';
export declare class DiseaseCategoryController {
    private readonly diseaseCategoryService;
    constructor(diseaseCategoryService: DiseaseCategoryService);
    getAllDiseaseCategory(filterDto: FilterDiseaseCategoryDto, user: UserDto): Promise<DiseaseCategoryDto[]>;
    getDiseaseCategoryById(diseaseCategoryId: string, filterDto: FilterDiseaseCategoryDto, user: UserDto): Promise<DiseaseCategoryDto>;
    createDiseaseCategory(userData: CreateDiseaseCategoryDto, user: UserDto): Promise<DiseaseCategoryDto>;
    updateDiseaseCategory(diseaseCategoryId: string, userData: UpdateDiseaseCategoryDto, user: UserDto): Promise<DiseaseCategoryDto>;
    deleteDiseaseCategory(diseaseCategoryId: string, user: UserDto): Promise<ResultInterface>;
    diseaseUserReportListView(userId: string, diseaseReportId: string, user: UserDto): Promise<DiseaseUserReportListViewDto[]>;
}
