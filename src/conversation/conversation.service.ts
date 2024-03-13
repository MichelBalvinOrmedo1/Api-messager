import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ConversationService {
  private readonly accessToken: string;
  private readonly apiVersion: string = 'v19.0';

  constructor() {
    // Reemplaza 'TU_ACCESS_TOKEN' con el token de acceso de tu aplicación de Facebook
    this.accessToken =
      'EAAGA8WM4ZArMBOy7CG3MmEK1NydTIhHqZBqkhaZBFZBHF5tRyWNXJKZBnmfzlFl7ybbia4c0LiV6nEmTTiPJyWcPTPHhAe0nmiMpzKzO1qA7mCedZBFXOU3pD40ep5VkSavhDZBWRrIHWce4M77T4WZBN6SvrZAZCyN1VxvAFUuKsI3XCWZBBlLax0PErDGBvymPZAQhOmZC3JnNkLtcDSV1I';
  }
  async getConversationsInstagram(limit: number) {
    try {
      const url = `https://graph.facebook.com/${this.apiVersion}/me/conversations`;
      const params = {
        params: {
          platform: 'instagram',
          fields: 'id,participants,updated_time',
          access_token: this.accessToken,
          limit: limit,
        },
      };
      /* 
        [
            {
                "id":"ID",
                "participants":"data": 
                        [
                            {
                                "username": "FROM",
                                "id": "17841464140324633"
                            },
                            {
                                "username": "TO",
                                "id": "7691381167553294"
                            }
                        ]
                "updated_time":"2024-03-12T18:38:41+0000"
            },
            {
                "id":"ID2",
                "updated_time":"2024-03-12T18:38:41+0000"
            }        ]
      */
      const response = await axios.get(url, params);
      const idParticipante = response.data.data[0].participants.data[1].id; //obtener informacion sobre el participante a mandar
      const infoPar = await axios.get(
        `https://graph.facebook.com/${this.apiVersion}/${idParticipante}?access_token=${this.accessToken}`,
      );
      console.log(infoPar.data);

      return JSON.stringify(response.data.data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getConversationsFacebook(limit: number) {
    try {
      const url = `https://graph.facebook.com/${this.apiVersion}/me/conversations`;

      /*
        id: El identificador único de la conversación.
        can_reply: Indica si el usuario puede responder a la conversación.
        name: El nombre de la conversación, si tiene alguno.
        participants: Lista de participantes en la conversación, donde cada participante tiene un ID único y un nombre de usuario.
        link: Enlace a la conversación en la aplicación de Instagram.
        is_subscribed: Indica si el usuario está suscrito a la conversación.
        message_count: La cantidad de mensajes en la conversación.
        scoped_thread_key: Clave única de la conversación.
        snippet: Fragmento del último mensaje en la conversación.
        subject: Asunto de la conversación.
        unread_count: La cantidad de mensajes no leídos en la conversación.
        updated_time: La fecha y hora de la última actualización de la conversación.
        wallpaper: URL de la imagen de fondo de la conversación, si está configurada.
        former_participants: Lista de participantes anteriores en la conversación.
      */
      const params = {
        params: {
          platform: 'MESSENGER',
          fields:
            'id,can_reply,name,participants,link,is_subscribed,message_count,scoped_thread_key,snippet,subject,unread_count,updated_time,wallpaper,former_participants',
          access_token: this.accessToken,
          limit: limit,
        },
      };
      /* 
        [
            {
                "id":"t_2260668624272514",
                "link":"/127268922281301/inbox/926150689059783/",
                "updated_time":"2024-03-11T23:51:31+0000"
            }    
        ]
      */
      const response = await axios.get(url, params);

      const idParticipante = response.data.data[0].participants.data[0].id; //Información sobre el destinatario del mensaje.
      const infoPar = await axios.get(
        `https://graph.facebook.com/${this.apiVersion}/${idParticipante}?access_token=${this.accessToken}`,
      );
      //console.log(infoPar.data);
      console.log(response.data.data[0].id);
      console.log(response.data.data[0].can_reply);
      console.log(response.data.data[0].participants);
      console.log(response.data.data[0].link);
      console.log(response.data.data[0].is_subscribed);
      console.log(response.data.data[0].message_count);
      console.log(response.data.data[0].scoped_thread_key);
      console.log(response.data.data[0].snippet);
      console.log(response.data.data[0].unread_count);
      console.log(response.data.data[0].updated_time);
      console.log(response.data.data[0].former_participants);

      /*
      console.log(response.data.data);
      console.log('\n');
      console.log(response.data.paging);
    */
      return JSON.stringify(response.data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getMessagesByIdConv(
    idConversation: string,
    limit: number,
    _platform: string,
  ) {
    try {
      const url = `https://graph.facebook.com/${this.apiVersion}/${idConversation}`;
      /*
        id: Identificador único del mensaje.
        message: El contenido del mensaje enviado.
        attachments: Archivos adjuntos al mensaje, como imágenes, videos u otros archivos multimedia.
          id: Identificador único del archivo adjunto.
          name: Nombre del archivo adjunto.
          size: Tamaño del archivo adjunto.
          image_data: Datos de la imagen adjunta, como su URL, ancho, alto, etc.
          generic_template: Plantilla genérica asociada al archivo adjunto.
          video_data: Datos del video adjunto, como su URL, duración, etc.
          file_url: URL del archivo adjunto.
          mime_type: Tipo MIME del archivo adjunto.
        story: Información relacionada con la historia del mensaje, si la hay.
        sticker: Información sobre cualquier sticker adjunto al mensaje.
        reactions: Reacciones al mensaje, como me gusta o me encanta.
        shares: Compartidos del mensaje, si los hay.
          description: Descripción del enlace compartido.
          id: Identificador único del enlace compartido.
          link: URL del enlace compartido.
          name: Nombre del enlace compartido.
          template: Plantilla del enlace compartido.
        created_time: Fecha y hora de creación del mensaje.
        from: Información sobre el remitente del mensaje.
        is_unsupported: Indica si el mensaje es compatible o no con la plataforma.
        tags: Etiquetas asocisadas al mensaje.
        thread_id: Identificador único del hilo de la conversación.
        to: Información sobre el destinatario del mensaje.
      */
      const params = {
        params: {
          fields:
            'messages.limit(10){id,message,shares.limit(10){id,description,link,name,template},created_time,from,is_unsupported,sticker,story,tags,thread_id,to,attachments.limit(10){generic_template,id,image_data,mime_type,size,video_data,name,file_url},reactions.limit(10)}',

          platform: _platform,
          access_token: this.accessToken,
        },
      };
      const response = await axios.get(url, params);
      //console.log(response.data.messages.data); //Obtener mensajes
      //console.log(response.data.messages.paging.next); //Obtener mas paginas

      console.log(response.data.messages.data);

      return 'exitoso'; // Retorna los datos de la conversación
    } catch (error) {
      throw new Error(error.message); // Maneja los errores en caso de que ocurran
    }
  }
}
