import {
  Controller,
  Get,
  Post,
  Body,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UsageService } from './usage.service';
import { CreateUsageDto } from './dto/create-usage.dto';
import { ResponseUsageDto } from './dto/response-usage-dto';
import {
  ApiTags,
  ApiBody,
  ApiCreatedResponse,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Usage')
@Controller('usage')
export class UsageController {
  constructor(private readonly usageService: UsageService) {}

  @Post('complete')
  @ApiBody({ type: CreateUsageDto })
  @ApiCreatedResponse({ type: ResponseUsageDto })
  create(@Body() createUsageDto: CreateUsageDto) {
    return this.usageService.create(createUsageDto);
  }

  @Get('top')
  @ApiQuery({ name: 'limit', type: Number })
  @ApiCreatedResponse({ type: ResponseUsageDto, isArray: true })
  findTopUsedModulesOfMonth(@Query('limit', ParseIntPipe) limit: number) {
    return this.usageService.findTopUsedModulesOfMonth(limit);
  }
}
