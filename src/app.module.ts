import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhooksModule } from './webhooks/webhooks.module';
import { ConversationModule } from './conversation/conversation.module';

@Module({
  imports: [WebhooksModule, ConversationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
