import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { SupporterRole } from 'common/enums/supporter-type.enum';

export class GetSupportersFilterDto {
  @IsOptional()
  @IsEnum(SupporterRole)
  role?: SupporterRole;

  @IsOptional()
  @IsDateString()
  startDate?: string; // ex: 2024-01-01

  @IsOptional()
  @IsDateString()
  endDate?: string; // ex: 2024-12-31
}
