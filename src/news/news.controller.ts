import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateNewsDto } from '../dto/create-news.dto';
import { NewsService } from '../service/products.service';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get('page/:page')
  getNews(@Param('page') page) {
    return this.newsService.getNewsPortion(page);
  }
  // value
  @Get('newsBy/:category/value/:value')
  getNewsByCategory(
    @Param('category') category,
    @Param('value') value: string,
  ) {
    return this.newsService.getNewsBy({ category, value });
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
