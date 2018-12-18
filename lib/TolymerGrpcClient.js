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
import config from '../nuxt.config';

const host = config.dev ? 'http://localhost:8080' : 'https://grpc.tolymer.com';
const client = new EventsClient(host, null, null);

export class GrpcError {
  constructor({ code, message }) {
    this.code = code;
    this.message = message;
  }

  isNotFound() {
    return this.code === grpc.StatusCode.NOT_FOUND;
  }

  toString() {
    return `GrpcError: ${this.message}`;
  }
}

export function getEvent(token) {
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

export function createEvent(params) {
  return new Promise(resolve => {
    const request = new CreateEventRequest();
    request.setDescription(params.description);
    request.setParticipantsList(params.participants);

    client.createEvent(request, {}, (err, res) => {
      const response = res ? res.toObject() : null;
      const error = err ? new GrpcError(err) : null;
      resolve([error, response]);
    });
  });
}

export function updateEvent(params) {
  return new Promise(resolve => {
    const request = new UpdateEventRequest();
    request.setEventToken(params.token);
    request.setDescription(params.description);
    const updateMask = new FieldMask();
    const paths = Object.keys(params).filter(key => key !== 'token');
    updateMask.setPathsList(paths);
    request.setUpdateMask(updateMask);

    client.updateEvent(request, {}, err => {
      const error = err ? new GrpcError(err) : null;
      resolve([error, null]);
    });
  });
}

export function updateParticipants(params) {
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

export function createGame(params) {
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

export function updateGame(params) {
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

export function deleteGame(params) {
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

export function postTip(params) {
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

export function deleteTip(params) {
  return new Promise(resolve => {
    const request = new DeleteTipRequest();
    request.setEventToken(params.token);
    client.deleteTip(request, {}, err => {
      const error = err ? new GrpcError(err) : null;
      resolve([error, null]);
    });
  });
}
