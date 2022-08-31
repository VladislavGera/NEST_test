import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNewsDto } from 'src/dto/create-news.dto';
import { News } from '../schemas/news.schema';
import { NewsDocument } from '../schemas/news.schema';

@Injectable()
export class NewsService {
  constructor(@InjectModel(News.name) private newsModel: Model<NewsDocument>) {}

  async getNewsPortion(page): Promise<any[]> {
    let pageSize = 10;
    const skips = page * (pageSize - 1);

    return this.newsModel.find().skip(skips).limit(pageSize);
  }

  async getNewsBy(data): Promise<any[]> {
    let category = data.category;
    let value = data.value;

    if (category == 'name') {
      return this.newsModel.find({ name: value });
    }
    if (category == 'likes') {
      return this.newsModel.find({ likes: value });
    }
    if (category == 'title') {
      return this.newsModel.find({ title: value });
    }
    if (category == 'date') {
      return this.newsModel.find({ title: value });
    }
  }

  async getNewsById(id: string): Promise<any> {
    return this.newsModel.findById(id);
  }

  async deleteNews(id: string): Promise<any> {
    return this.newsModel.findByIdAndRemove(id);
  }

  createNews(newsDto: CreateNewsDto): Promise<any> {
    const newProduct = new this.newsModel(newsDto);
    return newProduct.save();
  }
}
