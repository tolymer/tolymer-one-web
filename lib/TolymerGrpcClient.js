import {
  GetEventRequest,
  CreateEventRequest,
  UpdateEventRequest,
  CreateGameRequest,
  UpdateGameRequest,
  DeleteGameRequest,
  PostTipRequest,
  DeleteTipRequest,
  Date as PbDate,
  GameResult
} from './tolymer_pb.js';
import { FieldMask } from 'google-protobuf/google/protobuf/field_mask_pb';
import { EventsClient } from './tolymer_grpc_web_pb.js';

const client = new EventsClient('http://localhost:8080', null, null);

export function getEvent(token) {
  return new Promise((resolve, reject) => {
    const request = new GetEventRequest();
    request.setEventToken(token);

    client.getEvent(request, {}, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response.toObject());
      }
    });
  });
}

export function createEvent(params) {
  return new Promise((resolve, reject) => {
    const request = new CreateEventRequest();
    const date = new PbDate();
    const [year, month, day] = params.date.split('-').map(Number);
    date.setYear(year);
    date.setMonth(month);
    date.setDay(day);

    request.setTitle(params.title);
    request.setDescription(params.description);
    request.setDate(date);
    request.setParticipantsList(params.members);
    client.createEvent(request, {}, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response.getToken());
      }
    });
  });
}

export function updateEvent(params) {
  return new Promise((resolve, reject) => {
    const request = new UpdateEventRequest();
    request.setEventToken(params.token);
    request.setTitle(params.title);
    request.setDescription(params.description);
    const date = new PbDate();
    const [year, month, day] = params.date.split('-').map(Number);
    date.setYear(year);
    date.setMonth(month);
    date.setDay(day);
    request.setDate(date);
    const updateMask = new FieldMask();
    const paths = Object.keys(params).filter(key => key !== 'token');
    updateMask.setPathsList(paths);
    request.setUpdateMask(updateMask);
    client.updateEvent(request, {}, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function createGame(params) {
  return new Promise((resolve, reject) => {
    const request = new CreateGameRequest();
    request.setEventToken(params.token);
    const results = params.results.map(r => {
      const result = new GameResult();
      result.setParticipantId(r.participantId);
      result.setScore(r.score);
      return result;
    });
    request.setResultsList(results);
    client.createGame(request, {}, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response.getId());
      }
    });
  });
}

export function updateGame(params) {
  return new Promise((resolve, reject) => {
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
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function deleteGame(params) {
  return new Promise((resolve, reject) => {
    const request = new DeleteGameRequest();
    request.setEventToken(params.token);
    request.setGameId(params.gameId);
    client.deleteGame(request, {}, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function postTip(params) {
  return new Promise((resolve, reject) => {
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
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function deleteTip(params) {
  return new Promise((resolve, reject) => {
    const request = new DeleteTipRequest();
    request.setEventToken(params.token);
    client.deleteTip(request, {}, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
