import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateNewsDto } from '../dto/create-news.dto';
import { NewsService } from '../service/products.service';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get('page/:page')
  getNews(@Param('page') page) {
    return this.newsService.getNewsPortion(page);
  }

  @Get('category/:category/value/:value/page/:page')
  getNewsByCategory(
    @Param('category') category,
    @Param('value') value: string,
    @Param('page') page: string,
  ) {
    const categoryObj = { oldKey: value };

    categoryObj[category] = categoryObj['oldKey'];
    delete categoryObj['oldKey'];

    return this.newsService.getNewsBy({ categoryObj, page });
  }

  @Get(':id')
  getDetale(@Param('id') id: string) {
    return this.newsService.getNewsById(id);
  }

  @Put(':id')
  updateLikeCount(@Param('id') id: string, @Body() cretaeNewsDto: any) {
    return this.newsService.updateLikeCount({id, cretaeNewsDto});
  }

  @Delete(':id')
  deleteNews(@Param('id') id: string) {
    return this.newsService.deleteNews(id);
  }

  @Post()
  postNews(@Body() cretaeNewsDto: CreateNewsDto) {
    return this.newsService.createNews(cretaeNewsDto);
  }
}
