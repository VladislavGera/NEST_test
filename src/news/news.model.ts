import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from '../schemas/news.schema';
import { NewsService } from '../service/products.service';
import { NewsController } from './news.controller'


@Module({
    imports:[MongooseModule.forFeature([
         {name: News.name, schema: NewsSchema }
    ])],
    controllers: [NewsController],
    providers: [NewsService]
})
export class NewsModule {}