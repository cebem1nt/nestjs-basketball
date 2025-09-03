import { IsInt, IsOptional, IsString } from "class-validator";

export class PlayerDto {
    @IsOptional()
    @IsInt()
    id?: number;

    @IsString()
    name: string;

    @IsInt()
    draft_year: number;

    @IsInt()
    draft_round: number;

    @IsInt()
    draft_number: number;
}