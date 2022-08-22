import { IsNotEmpty, IsInt, Max } from 'class-validator'
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMovieDto {

    @IsNotEmpty()
    @ApiProperty()
    title:string;

    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @IsNotEmpty()
    @ApiProperty()
    genre: string

    @IsNotEmpty()
    @IsInt()
    @Max(2022)
    @ApiProperty()
    year: number

}

