import { IsOptional,IsInt,Max } from 'class-validator'
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMovieDto {

    @IsOptional()
    @ApiPropertyOptional()
    title:string;

    @IsOptional()
    @ApiPropertyOptional()
    description: string;

    @IsOptional()
    @ApiPropertyOptional()
    genre: string

    @IsOptional()
    @IsInt()
    @Max(2022)
    @ApiPropertyOptional()
    year: number

}