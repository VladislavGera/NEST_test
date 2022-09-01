import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNewsDto, ItemNewsDto } from 'src/dto/create-news.dto';
import { News } from '../schemas/news.schema';
import { NewsDocument } from '../schemas/news.schema';

@Injectable()
export class NewsService {
  constructor(@InjectModel(News.name) private newsModel: Model<NewsDocument>) {}

  async getNewsPortion(page): Promise<CreateNewsDto[]> {
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
      let description: string = item.description.slice(0, 20);
      let res = { ...item.toObject(), description };
      return res;
    });

    return news;
  }

  async getNewsById(id: string): Promise<ItemNewsDto> {
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

  async deleteNews(id: string): Promise<CreateNewsDto> {
    return this.newsModel.findByIdAndRemove(id);
  }

  createNews(newsDto: CreateNewsDto): Promise<CreateNewsDto> {
    const newProduct = new this.newsModel(newsDto);
    return newProduct.save();
  }

  async updateLikeCount(id): Promise<CreateNewsDto | any> {
    const news = await this.getNewsById(id);

    if (news.likes < 2000000) {
      const updateLikesCount = this.newsModel.findByIdAndUpdate(id, {
        likes: news.likes + 1,
      });

      return updateLikesCount;
    } else {
      return { message: 'you have too many likes' };
    }
  }
}
