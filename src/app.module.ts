import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsController } from './news/news.controller';
import { NewsService } from './service/products.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://vlad:plkiuplkiu@news.8nsiyan.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController, NewsController],
  providers: [AppService, NewsService],
})
export class AppModule {}
