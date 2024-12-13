import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEmployeeDto {

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsDate()
    @IsOptional()
    birthDate?: Date;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    note: string

}
