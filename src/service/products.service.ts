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
    let pageSize = 10;

    const skips = data.page * (pageSize - 1);

    const news = (
      await this.newsModel.find(data.categoryObj).skip(skips).limit(pageSize)
    ).map((item) => {
      let description = item.description.slice(0, 20);
      let res = { ...item.toObject(), description };
      return res;
    });

    return news;
  }

  async getNewsById(id: string): Promise<any> {
    let news = await this.newsModel.findById(id);

    const res = {
      title: news.title,
      image: news.image,
      description: news.description,
      likes: news.likes,
      _id: news._id,
    };

    return res;
  }

  async deleteNews(id: string): Promise<any> {
    return this.newsModel.findByIdAndRemove(id);
  }

  createNews(newsDto: CreateNewsDto): Promise<any> {
    const newProduct = new this.newsModel(newsDto);
    return newProduct.save();
  }

  async updateLikeCount(data): Promise<any> {
    const news = await this.getNewsById(data.id);

    if (news.likes < 2000000) {
      const updateLikesCount = this.newsModel.findByIdAndUpdate(data.id, {
        likes: news.likes + 1,
      });

      return updateLikesCount;
    } else {
      return { message: 'you have too many likes' };
    }
  }
}
