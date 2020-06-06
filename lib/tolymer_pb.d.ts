export class Empty {
  constructor ();
  toObject(): Empty.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

export class FieldMask {
  constructor ();
  getPathsList(): string[];
  setPathsList(a: string[]): void;
  toObject(): FieldMask.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => FieldMask;
}

export namespace FieldMask {
  export type AsObject = {
    PathsList: string[];
  }
}

export class CreateEventRequest {
  constructor ();
  getDescription(): string;
  setDescription(a: string): void;
  getParticipantsList(): string[];
  setParticipantsList(a: string[]): void;
  getEventDate(): Date;
  setEventDate(a: Date): void;
  toObject(): CreateEventRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => CreateEventRequest;
}

export namespace CreateEventRequest {
  export type AsObject = {
    Description: string;
    ParticipantsList: string[];
    EventDate: Date;
  }
}

export class CreateGameRequest {
  constructor ();
  getEventToken(): string;
  setEventToken(a: string): void;
  getResultsList(): GameResult[];
  setResultsList(a: GameResult[]): void;
  toObject(): CreateGameRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => CreateGameRequest;
}

export namespace CreateGameRequest {
  export type AsObject = {
    EventToken: string;
    ResultsList: GameResult[];
  }
}

export class Date {
  constructor ();
  getYear(): number;
  setYear(a: number): void;
  getMonth(): number;
  setMonth(a: number): void;
  getDay(): number;
  setDay(a: number): void;
  toObject(): Date.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => Date;
}

export namespace Date {
  export type AsObject = {
    Year: number;
    Month: number;
    Day: number;
  }
}

export class DeleteGameRequest {
  constructor ();
  getEventToken(): string;
  setEventToken(a: string): void;
  getGameId(): number;
  setGameId(a: number): void;
  toObject(): DeleteGameRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => DeleteGameRequest;
}

export namespace DeleteGameRequest {
  export type AsObject = {
    EventToken: string;
    GameId: number;
  }
}

export class DeleteTipRequest {
  constructor ();
  getEventToken(): string;
  setEventToken(a: string): void;
  toObject(): DeleteTipRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => DeleteTipRequest;
}

export namespace DeleteTipRequest {
  export type AsObject = {
    EventToken: string;
  }
}

export class Event {
  constructor ();
  getToken(): string;
  setToken(a: string): void;
  getDescription(): string;
  setDescription(a: string): void;
  getParticipantsList(): Participant[];
  setParticipantsList(a: Participant[]): void;
  getGamesList(): Game[];
  setGamesList(a: Game[]): void;
  getTip(): Tip;
  setTip(a: Tip): void;
  getEventDate(): Date;
  setEventDate(a: Date): void;
  toObject(): Event.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => Event;
}

export namespace Event {
  export type AsObject = {
    Token: string;
    Description: string;
    ParticipantsList: Participant[];
    GamesList: Game[];
    Tip: Tip;
    EventDate: Date;
  }
}

export class Game {
  constructor ();
  getId(): number;
  setId(a: number): void;
  getResultsList(): GameResult[];
  setResultsList(a: GameResult[]): void;
  toObject(): Game.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => Game;
}

export namespace Game {
  export type AsObject = {
    Id: number;
    ResultsList: GameResult[];
  }
}

export class GameResult {
  constructor ();
  getParticipantId(): number;
  setParticipantId(a: number): void;
  getRank(): number;
  setRank(a: number): void;
  getScore(): number;
  setScore(a: number): void;
  toObject(): GameResult.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => GameResult;
}

export namespace GameResult {
  export type AsObject = {
    ParticipantId: number;
    Rank: number;
    Score: number;
  }
}

export class GetEventRequest {
  constructor ();
  getEventToken(): string;
  setEventToken(a: string): void;
  toObject(): GetEventRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => GetEventRequest;
}

export namespace GetEventRequest {
  export type AsObject = {
    EventToken: string;
  }
}

export class Participant {
  constructor ();
  getId(): number;
  setId(a: number): void;
  getName(): string;
  setName(a: string): void;
  toObject(): Participant.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => Participant;
}

export namespace Participant {
  export type AsObject = {
    Id: number;
    Name: string;
  }
}

export class PostTipRequest {
  constructor ();
  getEventToken(): string;
  setEventToken(a: string): void;
  getResultsList(): TipResult[];
  setResultsList(a: TipResult[]): void;
  toObject(): PostTipRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => PostTipRequest;
}

export namespace PostTipRequest {
  export type AsObject = {
    EventToken: string;
    ResultsList: TipResult[];
  }
}

export class Tip {
  constructor ();
  getResultsList(): TipResult[];
  setResultsList(a: TipResult[]): void;
  toObject(): Tip.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => Tip;
}

export namespace Tip {
  export type AsObject = {
    ResultsList: TipResult[];
  }
}

export class TipResult {
  constructor ();
  getParticipantId(): number;
  setParticipantId(a: number): void;
  getScore(): number;
  setScore(a: number): void;
  toObject(): TipResult.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => TipResult;
}

export namespace TipResult {
  export type AsObject = {
    ParticipantId: number;
    Score: number;
  }
}

export class UpdateEventRequest {
  constructor ();
  getEventToken(): string;
  setEventToken(a: string): void;
  getDescription(): string;
  setDescription(a: string): void;
  getUpdateMask(): FieldMask;
  setUpdateMask(a: FieldMask): void;
  getEventDate(): Date;
  setEventDate(a: Date): void;
  toObject(): UpdateEventRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => UpdateEventRequest;
}

export namespace UpdateEventRequest {
  export type AsObject = {
    EventToken: string;
    Description: string;
    UpdateMask: FieldMask;
    EventDate: Date;
  }
}

export class UpdateGameRequest {
  constructor ();
  getEventToken(): string;
  setEventToken(a: string): void;
  getGameId(): number;
  setGameId(a: number): void;
  getResultsList(): GameResult[];
  setResultsList(a: GameResult[]): void;
  getUpdateMask(): FieldMask;
  setUpdateMask(a: FieldMask): void;
  toObject(): UpdateGameRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => UpdateGameRequest;
}

export namespace UpdateGameRequest {
  export type AsObject = {
    EventToken: string;
    GameId: number;
    ResultsList: GameResult[];
    UpdateMask: FieldMask;
  }
}

export class UpdateParticipantsRequest {
  constructor ();
  getEventToken(): string;
  setEventToken(a: string): void;
  getRenamingParticipantsList(): Participant[];
  setRenamingParticipantsList(a: Participant[]): void;
  getAddingNamesList(): string[];
  setAddingNamesList(a: string[]): void;
  getDeletingIdsList(): number[];
  setDeletingIdsList(a: number[]): void;
  toObject(): UpdateParticipantsRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => UpdateParticipantsRequest;
}

export namespace UpdateParticipantsRequest {
  export type AsObject = {
    EventToken: string;
    RenamingParticipantsList: Participant[];
    AddingNamesList: string[];
    DeletingIdsList: number[];
  }
}

