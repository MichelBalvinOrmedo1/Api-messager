import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WebhooksService {
  private async getSubscriptions(appId: string, accessToken: string) {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/${appId}/subscriptions`,
        {
          params: {
            access_token: accessToken,
          },
        },
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Graph returned an error:', error.response.data);
        throw new Error('Graph returned an error');
      } else if (error.request) {
        console.error('Request made but no response received:', error.request);
        throw new Error('Request made but no response received');
      } else {
        console.error('Error setting up request:', error.message);
        throw new Error('Error setting up request');
      }
    }
  }

  async fetchSubscriptions(appId: string, accessToken: string) {
    try {
      const subscriptions = await this.getSubscriptions(appId, accessToken);
      return { data: subscriptions };
    } catch (error) {
      return { error: error.message };
    }
  }

  async subscribeToPage(appId: string, subscriptionData: any) {
    // Establecer los campos por defecto si no se proporcionan en subscriptionData
    const defaultFields =
      'message_reactions,messages,messaging_handover,messaging_postbacks,messaging_referral,messaging_seen';

    try {
      const response = await axios.post(
        `https://graph.facebook.com/${appId}/subscriptions`,
        {
          object: subscriptionData.object,
          callback_url: subscriptionData.callback_url,
          fields: subscriptionData.fields || defaultFields,
          verify_token: subscriptionData.verify_token,
          include_values: subscriptionData.include_values,
          access_token: subscriptionData.access_token,
        },
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Facebook devolvió un error:', error.response.data);
        throw new Error('Facebook devolvió un error');
      } else if (error.request) {
        console.error(
          'Se realizó la solicitud pero no se recibió respuesta:',
          error.request,
        );
        throw new Error('Se realizó la solicitud pero no se recibió respuesta');
      } else {
        console.error('Error al configurar la solicitud:', error.message);
        throw new Error('Error al configurar la solicitud');
      }
    }
  }

  async deleteSubscription(appId: string, data: any) {
    try {
      const response = await axios.delete(
        `https://graph.facebook.com/${appId}/subscriptions`,
        {
          data: {
            access_token: data.access_token,
            object: data.object,
          },
        },
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Graph returned an error:', error.response.data);
        throw new HttpException(
          'Graph returned an error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        console.error('Error setting up request:', error.message);
        throw new HttpException(
          'Error setting up request',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
