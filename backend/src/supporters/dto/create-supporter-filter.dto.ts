import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { SupporterProfile } from 'common/enums/supporter-type.enum';

export class GetSupportersFilterDto {
  @IsOptional()
  @IsEnum(SupporterProfile)
  profile?: SupporterProfile;

  @IsOptional()
  @IsDateString()
  startDate?: string; // ex: 2024-01-01

  @IsOptional()
  @IsDateString()
  endDate?: string; // ex: 2024-12-31
}
