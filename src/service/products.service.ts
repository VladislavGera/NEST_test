import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from 'src/dto/create-news.dto';

@Injectable()
export class NewsService {
  private news: any[] = [];

  getNewsPortion() {
    /// get pagination portion
    return this.news;
  }

  getNewsById(id: string) {
    return this.news.find((item) => item.id === id);
  }

  createNews(newsDto: CreateNewsDto) {
    this.news.push({ ...newsDto, id: Date.now().toString() });
  }
}
