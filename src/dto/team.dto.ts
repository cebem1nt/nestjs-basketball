import { IsString, IsInt, IsOptional, Min } from 'class-validator';

export class TeamDto {
    @IsOptional()
    @IsInt()
    id?: number;

    @IsString()
    name: string;

    @IsString()
    city: string;

    @IsInt()
    year_founded: number;
}