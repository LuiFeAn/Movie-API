import { IsNotEmpty, IsInt, Max } from 'class-validator'

export class CreateMovieDto {

    @IsNotEmpty()
    title:string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    genre: string

    @IsNotEmpty()
    @IsInt()
    @Max(2022)
    year: number

}

