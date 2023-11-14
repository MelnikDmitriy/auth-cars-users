import { Type } from "class-transformer";
import { IsInt, IsPositive, Max, Min } from "class-validator";

export class PaginationDto {

    @IsInt()
    @IsPositive()
    @Min(1)
    @Type(() => Number)
    page: number;

    @IsInt()
    @IsPositive()
    @Min(1)
    @Max(10)
    @Type(() => Number)
    pageSize: number;
}