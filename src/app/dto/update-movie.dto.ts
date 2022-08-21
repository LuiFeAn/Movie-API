import { IsOptional,IsInt,Max } from 'class-validator'

export class UpdateMovieDto {

    @IsOptional()
    title:string;

    @IsOptional()
    description: string;

    @IsOptional()
    genre: string

    @IsOptional()
    @IsInt()
    @Max(2022)
    year: number

}