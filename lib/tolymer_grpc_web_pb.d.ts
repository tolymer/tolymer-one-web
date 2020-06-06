import * as grpcWeb from 'grpc-web';
import {
  Empty,
  FieldMask,
  CreateEventRequest,
  CreateGameRequest,
  Date,
  DeleteGameRequest,
  DeleteTipRequest,
  Event,
  Game,
  GameResult,
  GetEventRequest,
  Participant,
  PostTipRequest,
  Tip,
  TipResult,
  UpdateEventRequest,
  UpdateGameRequest,
  UpdateParticipantsRequest} from './tolymer_pb';

export class EventsClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  getEvent(
    request: GetEventRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: Event) => void
  ): grpcWeb.ClientReadableStream<Event>;

  createEvent(
    request: CreateEventRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: Event) => void
  ): grpcWeb.ClientReadableStream<Event>;

  updateEvent(
    request: UpdateEventRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: Event) => void
  ): grpcWeb.ClientReadableStream<Event>;

  updateParticipants(
    request: UpdateParticipantsRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: Empty) => void
  ): grpcWeb.ClientReadableStream<Empty>;

  createGame(
    request: CreateGameRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: Game) => void
  ): grpcWeb.ClientReadableStream<Game>;

  updateGame(
    request: UpdateGameRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: Game) => void
  ): grpcWeb.ClientReadableStream<Game>;

  deleteGame(
    request: DeleteGameRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: Empty) => void
  ): grpcWeb.ClientReadableStream<Empty>;

  postTip(
    request: PostTipRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: Tip) => void
  ): grpcWeb.ClientReadableStream<Tip>;

  deleteTip(
    request: DeleteTipRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: Empty) => void
  ): grpcWeb.ClientReadableStream<Empty>;

}

export class EventsPromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  getEvent(
    request: GetEventRequest,
    metadata: grpcWeb.Metadata
  ): Promise<Event>;

  createEvent(
    request: CreateEventRequest,
    metadata: grpcWeb.Metadata
  ): Promise<Event>;

  updateEvent(
    request: UpdateEventRequest,
    metadata: grpcWeb.Metadata
  ): Promise<Event>;

  updateParticipants(
    request: UpdateParticipantsRequest,
    metadata: grpcWeb.Metadata
  ): Promise<Empty>;

  createGame(
    request: CreateGameRequest,
    metadata: grpcWeb.Metadata
  ): Promise<Game>;

  updateGame(
    request: UpdateGameRequest,
    metadata: grpcWeb.Metadata
  ): Promise<Game>;

  deleteGame(
    request: DeleteGameRequest,
    metadata: grpcWeb.Metadata
  ): Promise<Empty>;

  postTip(
    request: PostTipRequest,
    metadata: grpcWeb.Metadata
  ): Promise<Tip>;

  deleteTip(
    request: DeleteTipRequest,
    metadata: grpcWeb.Metadata
  ): Promise<Empty>;

}

