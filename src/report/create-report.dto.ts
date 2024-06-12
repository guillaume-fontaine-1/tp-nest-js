// src/report/dto/create-report.dto.ts
import { IsNumber, IsString, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty({ description: 'The price of the report', example: 15000 })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'The make of the car', example: 'Toyota' })
  @IsString()
  make: string;

  @ApiProperty({ description: 'The model of the car', example: 'Corolla' })
  @IsString()
  model: string;

  @ApiProperty({ description: 'The year of the car', example: 2020, minimum: 2000, maximum: 2023 })
  @IsNumber()
  @Min(2000)
  @Max(2023)
  year: number;

  @ApiProperty({ description: 'The longitude of the report location', example: 100 })
  @IsNumber()
  lng: number;

  @ApiProperty({ description: 'The latitude of the report location', example: 100 })
  @IsNumber()
  lat: number;

  @ApiProperty({ description: 'The mileage of the car', example: 15000, minimum: 0, maximum: 500000 })
  @IsNumber()
  @Min(0)
  @Max(500000)
  mileage: number;
}
