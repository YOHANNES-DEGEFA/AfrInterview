import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join_room')
  async joinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() roomName: string,
  ) {
    const room = this.server.in(roomName);

    const roomSockets = await room.fetchSockets();
    const numberOfPeopleInRoom = roomSockets.length;

    // a maximum of 2 people can join a room
    if (numberOfPeopleInRoom > 1) {
      room.emit('too_many_people');
      return;
    }

    if (numberOfPeopleInRoom === 1) {
      room.emit('another_person_ready');
    }

    socket.join(roomName);
  }

  @SubscribeMessage('send_connection_offer')
  async sendConnectionOffer(
    @MessageBody()
    { offer, roomName }: { offer: RTCSessionDescriptionInit; roomName: string },
    @ConnectedSocket() socket: Socket,
  ) {
    this.server
      .in(roomName)
      .except(socket.id)
      .emit('send_connection_offer', { offer, roomName });
  }

  @SubscribeMessage('answer')
  async answer(
    @MessageBody()
    {
      answer,
      roomName,
    }: { answer: RTCSessionDescriptionInit; roomName: string },
    @ConnectedSocket() socket: Socket,
  ) {
    this.server
      .in(roomName)
      .except(socket.id)
      .emit('answer', { answer, roomName });
  }

  @SubscribeMessage('send_candidate')
  async sendCandidate(
    @MessageBody()
    { candidate, roomName }: { candidate: unknown; roomName: string },
    @ConnectedSocket() socket: Socket,
  ) {
    this.server
      .in(roomName)
      .except(socket.id)
      .emit('send_candidate', { candidate, roomName });
  }
}
