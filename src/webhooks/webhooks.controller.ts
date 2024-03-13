import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Get('/subscipcion')
  async getSubscriptions(
    @Query('appId') appId: string,
    @Query('accessToken') accessToken: string,
  ) {
    return this.webhooksService.fetchSubscriptions(appId, accessToken);
  }
  @Post('/subscribe')
  async subscribeToInstagram(
    @Query('appId') appId: string,
    @Body() subscriptionData: any,
  ) {
    return await this.webhooksService.subscribeToPage(appId, subscriptionData);
  }
  @Delete('/deleteSubcribe')
  async deleteSubscription(@Query('appId') appId: string, @Body() data: any) {
    return await this.webhooksService.deleteSubscription(appId, data);
  }
}
