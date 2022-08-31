import { NewsModule } from './news/news.model';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    NewsModule,
    MongooseModule.forRoot(
      'mongodb+srv://vlad:plkiuplkiu@news.8nsiyan.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
