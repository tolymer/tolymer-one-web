import {
  GetEventRequest,
  CreateEventRequest,
  UpdateEventRequest,
  UpdateParticipantsRequest,
  CreateGameRequest,
  UpdateGameRequest,
  DeleteGameRequest,
  PostTipRequest,
  DeleteTipRequest,
  Participant,
  GameResult
} from './tolymer_pb.js';
import { FieldMask } from 'google-protobuf/google/protobuf/field_mask_pb';
import grpc from 'grpc-web';
import { EventsClient } from './tolymer_grpc_web_pb.js';
import config from '~/nuxt.config';
import { dateToProto } from './ProtobufType';

const host = config.dev ? 'http://localhost:8080' : 'https://tolymer-grpc.hokaccha.dev';
const client = new EventsClient(host, null, null);

interface GrpcErrorParams {
  code: number;
  message: string;
}

export class GrpcError {
  code: number;
  message: string;

  constructor({ code, message }: GrpcErrorParams) {
    this.code = code;
    this.message = message;
  }

  isNotFound(): boolean {
    return this.code === grpc.StatusCode.NOT_FOUND;
  }

  toString(): string {
    return `GrpcError: ${this.message}`;
  }
}

export function getEvent(token): Promise<any> {
  return new Promise(resolve => {
    const request = new GetEventRequest();
    request.setEventToken(token);

    client.getEvent(request, {}, (err, res) => {
      const response = res ? res.toObject() : null;
      const error = err ? new GrpcError(err) : null;
      resolve([error, response]);
    });
  });
}

export function createEvent(params): Promise<any> {
  return new Promise(resolve => {
    const request = new CreateEventRequest();
    request.setEventDate(dateToProto(params.eventDate));
    request.setParticipantsList(params.participants);

    client.createEvent(request, {}, (err, res) => {
      const response = res ? res.toObject() : null;
      const error = err ? new GrpcError(err) : null;
      resolve([error, response]);
    });
  });
}

export function updateEvent(params): Promise<any> {
  return new Promise(resolve => {
    const request = new UpdateEventRequest();
    request.setEventToken(params.token);
    request.setEventDate(dateToProto(params.eventDate));
    const updateMask = new FieldMask();
    updateMask.setPathsList(['event_date']);
    request.setUpdateMask(updateMask);

    client.updateEvent(request, {}, err => {
      const error = err ? new GrpcError(err) : null;
      resolve([error, null]);
    });
  });
}

export function updateParticipants(params): Promise<any> {
  return new Promise(resolve => {
    const request = new UpdateParticipantsRequest();
    const renamingParticipants = params.renamingParticipants.map(participant => {
      const p = new Participant();
      p.setId(participant.id);
      p.setName(participant.name);
      return p;
    });
    request.setEventToken(params.token);
    request.setRenamingParticipantsList(renamingParticipants);

    client.updateParticipants(request, {}, err => {
      const error = err ? new GrpcError(err) : null;
      resolve([error, null]);
    });
  });
}

export function createGame(params): Promise<any> {
  return new Promise(resolve => {
    const request = new CreateGameRequest();
    request.setEventToken(params.token);
    const results = params.results.map(r => {
      const result = new GameResult();
      result.setParticipantId(r.participantId);
      result.setScore(r.score);
      return result;
    });
    request.setResultsList(results);

    client.createGame(request, {}, (err, res) => {
      const response = res ? res.toObject() : null;
      const error = err ? new GrpcError(err) : null;
      resolve([error, response]);
    });
  });
}

export function updateGame(params): Promise<any> {
  return new Promise(resolve => {
    const request = new UpdateGameRequest();
    request.setEventToken(params.token);
    request.setGameId(params.gameId);
    const results = params.results.map(r => {
      const result = new GameResult();
      result.setParticipantId(r.participantId);
      result.setScore(r.score);
      return result;
    });
    request.setResultsList(results);
    const updateMask = new FieldMask();
    updateMask.setPathsList(['results']);
    request.setUpdateMask(updateMask);

    client.updateGame(request, {}, err => {
      const error = err ? new GrpcError(err) : null;
      resolve([error, null]);
    });
  });
}

export function deleteGame(params): Promise<any> {
  return new Promise(resolve => {
    const request = new DeleteGameRequest();
    request.setEventToken(params.token);
    request.setGameId(params.gameId);

    client.deleteGame(request, {}, err => {
      const error = err ? new GrpcError(err) : null;
      resolve([error, null]);
    });
  });
}

export function postTip(params): Promise<any> {
  return new Promise(resolve => {
    const request = new PostTipRequest();
    request.setEventToken(params.token);
    const results = params.results.map(r => {
      const result = new GameResult();
      result.setParticipantId(r.participantId);
      result.setScore(r.score);
      return result;
    });
    request.setResultsList(results);

    client.postTip(request, {}, err => {
      const error = err ? new GrpcError(err) : null;
      resolve([error, null]);
    });
  });
}

export function deleteTip(params): Promise<any> {
  return new Promise(resolve => {
    const request = new DeleteTipRequest();
    request.setEventToken(params.token);
    client.deleteTip(request, {}, err => {
      const error = err ? new GrpcError(err) : null;
      resolve([error, null]);
    });
  });
}
