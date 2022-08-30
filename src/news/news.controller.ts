import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateNewsDto } from '../dto/create-news.dto';
import { NewsService } from '../service/products.service';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  getNews() {
    return this.newsService.getNewsPortion();
  }

  @Get(':id')
  getDetale(@Param('id') id: string) {
    return this.newsService.getNewsById(id);
  }

  @Post()
  postNews(@Body() cretaeNewsDto: CreateNewsDto) {
    return this.newsService.createNews(cretaeNewsDto);
  }
}
