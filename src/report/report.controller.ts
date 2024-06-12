import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './create-report.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  createReport(@Body() createReportDto: CreateReportDto) {
    return this.reportService.create(createReportDto);
  }
}