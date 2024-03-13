import { Controller, Get } from '@nestjs/common';
import { ConversationService } from './conversation.service';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}
  @Get('instagram')
  async getConversationInstagram() {
    return await this.conversationService.getConversationsInstagram(10);
  }
  @Get('facebooks')
  async getConversationMessager() {
    return await this.conversationService.getConversationsFacebook(10);
  }
  @Get('messenger/id')
  async getConversationByIdInstagram() {
    return await this.conversationService.getMessagesByIdConv(
      'aWdfZAG06MTpJR01lc3NhZA2VUaHJlYWQ6MTc4NDE0NjQxNDAzMjQ2MzM6MzQwMjgyMzY2ODQxNzEwMzAxMjQ0Mjc2MDI0OTU2NDU4MjQwNTgw',
      10,
      'instagram',
    );
  }
}
