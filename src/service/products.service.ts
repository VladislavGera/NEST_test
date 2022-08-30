import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from 'src/dto/create-news.dto';

@Injectable()
export class NewsService {
  private news: any[] = [];

  getNewsPortion(page) {
    let pageSize = 10;
    let portionNewsList = this.news.slice(
      (page - 1) * pageSize,
      page * pageSize,
    );

    return portionNewsList;
  }

  getNewsBy(data) {
    let newsByCategory = this.news.filter((item) => {
      if (data.category == 'name') {
        return data.value === item.name;
      }
      if (data.category == 'likes') {
        return data.value < item.likes;
      }
      if (data.category == 'title') {
        return data.value === item.title;
      }
    });

    return newsByCategory;
  }

  getNewsById(id: string) {
    return this.news.find((item) => item.id === id);
  }

  createNews(newsDto: CreateNewsDto) {
    this.news.push({ ...newsDto, id: Date.now().toString() });
  }
}
