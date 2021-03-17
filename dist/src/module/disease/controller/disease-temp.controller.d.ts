import { ResultInterface } from 'src/interfaces/result.interface';
import { UserDto } from '../../user/dto/user.dto';
import { CreateDiseaseTempDto } from '../dto/disease-temp/create-disease-temp.dto';
import { DiseaseTempDto } from '../dto/disease-temp/disease-temp.dto';
import { FilterDiseaseTempDto } from '../dto/disease-temp/filter-disease-temp.dto';
import { UpdateDiseaseTempDto } from '../dto/disease-temp/update-disease-temp.dto';
import { CreateGenotypeDiseaseTempDto } from '../dto/genotype-disease-temp/create-genotype-disease-temp.dto';
import { FilterGenotypeDiseaseTempDto } from '../dto/genotype-disease-temp/filter-genotype-disease-temp.dto';
import { GenotypeDiseaseTempDto } from '../dto/genotype-disease-temp/genotype-disease-temp.dto';
import { DiseaseTempService } from '../service/disease-temp.service';
export declare class DiseaseTempController {
    private readonly diseaseTempService;
    constructor(diseaseTempService: DiseaseTempService);
    getAllDiseaseTemp(filterDto: FilterDiseaseTempDto, user: UserDto): Promise<DiseaseTempDto[]>;
    getDiseaseTempById(diseaseTempId: string, filterDto: FilterDiseaseTempDto, user: UserDto): Promise<DiseaseTempDto>;
    createDiseaseTemp(userData: CreateDiseaseTempDto, user: UserDto): Promise<DiseaseTempDto>;
    updateDiseaseTemp(diseaseTempId: string, userData: UpdateDiseaseTempDto, user: UserDto): Promise<DiseaseTempDto>;
    deleteDiseaseTemp(diseaseTempId: string, user: UserDto): Promise<ResultInterface>;
    createGenotypeDiseaseTemp(diseaseTempId: string, userData: CreateGenotypeDiseaseTempDto, user: UserDto): Promise<GenotypeDiseaseTempDto>;
    getAllGenotypeDiseaseTemp(diseaseTempId: string, filterDto: FilterGenotypeDiseaseTempDto, user: UserDto): Promise<GenotypeDiseaseTempDto[]>;
}
