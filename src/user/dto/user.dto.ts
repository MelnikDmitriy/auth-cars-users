import { IsDateString, IsString, IsUrl, Matches, MinLength } from "class-validator";

export class UserDto {

    @IsString()
    name: string;

    @IsString()
    lastName: string;

    @IsString()
    surname: string;

    @IsString()
    @Matches(/^\+\d{1,}$/)
    phone: string;

    @IsDateString()
    dateOfBirth: string;

    // @IsUrl()
    avatar: string;

    @IsString()
    @MinLength(6)
    login: string;


    @IsString()
    @MinLength(6)
    password: string;

}