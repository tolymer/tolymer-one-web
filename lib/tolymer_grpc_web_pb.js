/**
 * @fileoverview gRPC-Web generated client stub for tolymer.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')

var google_protobuf_field_mask_pb = require('google-protobuf/google/protobuf/field_mask_pb.js')
const proto = {};
proto.tolymer = {};
proto.tolymer.v1 = require('./tolymer_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.tolymer.v1.EventsClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.tolymer.v1.EventsPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.tolymer.v1.EventsClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.tolymer.v1.EventsClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.tolymer.v1.GetEventRequest,
 *   !proto.tolymer.v1.Event>}
 */
const methodInfo_Events_GetEvent = new grpc.web.AbstractClientBase.MethodInfo(
  proto.tolymer.v1.Event,
  /** @param {!proto.tolymer.v1.GetEventRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.tolymer.v1.Event.deserializeBinary
);


/**
 * @param {!proto.tolymer.v1.GetEventRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.tolymer.v1.Event)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.tolymer.v1.Event>|undefined}
 *     The XHR Node Readable Stream
 */
proto.tolymer.v1.EventsClient.prototype.getEvent =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/tolymer.v1.Events/GetEvent',
      request,
      metadata || {},
      methodInfo_Events_GetEvent,
      callback);
};


/**
 * @param {!proto.tolymer.v1.GetEventRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.tolymer.v1.Event>}
 *     The XHR Node Readable Stream
 */
proto.tolymer.v1.EventsPromiseClient.prototype.getEvent =
    function(request, metadata) {
  var _this = this;
  return new Promise(function (resolve, reject) {
    _this.delegateClient_.getEvent(
      request, metadata, function (error, response) {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.tolymer.v1.CreateEventRequest,
 *   !proto.tolymer.v1.Event>}
 */
const methodInfo_Events_CreateEvent = new grpc.web.AbstractClientBase.MethodInfo(
  proto.tolymer.v1.Event,
  /** @param {!proto.tolymer.v1.CreateEventRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.tolymer.v1.Event.deserializeBinary
);


/**
 * @param {!proto.tolymer.v1.CreateEventRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.tolymer.v1.Event)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.tolymer.v1.Event>|undefined}
 *     The XHR Node Readable Stream
 */
proto.tolymer.v1.EventsClient.prototype.createEvent =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/tolymer.v1.Events/CreateEvent',
      request,
      metadata || {},
      methodInfo_Events_CreateEvent,
      callback);
};


/**
 * @param {!proto.tolymer.v1.CreateEventRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.tolymer.v1.Event>}
 *     The XHR Node Readable Stream
 */
proto.tolymer.v1.EventsPromiseClient.prototype.createEvent =
    function(request, metadata) {
  var _this = this;
  return new Promise(function (resolve, reject) {
    _this.delegateClient_.createEvent(
      request, metadata, function (error, response) {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.tolymer.v1.UpdateEventRequest,
 *   !proto.tolymer.v1.Event>}
 */
const methodInfo_Events_UpdateEvent = new grpc.web.AbstractClientBase.MethodInfo(
  proto.tolymer.v1.Event,
  /** @param {!proto.tolymer.v1.UpdateEventRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.tolymer.v1.Event.deserializeBinary
);


/**
 * @param {!proto.tolymer.v1.UpdateEventRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.tolymer.v1.Event)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.tolymer.v1.Event>|undefined}
 *     The XHR Node Readable Stream
 */
proto.tolymer.v1.EventsClient.prototype.updateEvent =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/tolymer.v1.Events/UpdateEvent',
      request,
      metadata || {},
      methodInfo_Events_UpdateEvent,
      callback);
};


/**
 * @param {!proto.tolymer.v1.UpdateEventRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.tolymer.v1.Event>}
 *     The XHR Node Readable Stream
 */
proto.tolymer.v1.EventsPromiseClient.prototype.updateEvent =
    function(request, metadata) {
  var _this = this;
  return new Promise(function (resolve, reject) {
    _this.delegateClient_.updateEvent(
      request, metadata, function (error, response) {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.tolymer.v1.UpdateParticipantsRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_Events_UpdateParticipants = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.tolymer.v1.UpdateParticipantsRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.tolymer.v1.UpdateParticipantsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.tolymer.v1.EventsClient.prototype.updateParticipants =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/tolymer.v1.Events/UpdateParticipants',
      request,
      metadata || {},
      methodInfo_Events_UpdateParticipants,
      callback);
};


/**
 * @param {!proto.tolymer.v1.UpdateParticipantsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.tolymer.v1.EventsPromiseClient.prototype.updateParticipants =
    function(request, metadata) {
  var _this = this;
  return new Promise(function (resolve, reject) {
    _this.delegateClient_.updateParticipants(
      request, metadata, function (error, response) {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.tolymer.v1.CreateGameRequest,
 *   !proto.tolymer.v1.Game>}
 */
const methodInfo_Events_CreateGame = new grpc.web.AbstractClientBase.MethodInfo(
  proto.tolymer.v1.Game,
  /** @param {!proto.tolymer.v1.CreateGameRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.tolymer.v1.Game.deserializeBinary
);


/**
 * @param {!proto.tolymer.v1.CreateGameRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.tolymer.v1.Game)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.tolymer.v1.Game>|undefined}
 *     The XHR Node Readable Stream
 */
proto.tolymer.v1.EventsClient.prototype.createGame =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/tolymer.v1.Events/CreateGame',
      request,
      metadata || {},
      methodInfo_Events_CreateGame,
      callback);
};


/**
 * @param {!proto.tolymer.v1.CreateGameRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.tolymer.v1.Game>}
 *     The XHR Node Readable Stream
 */
proto.tolymer.v1.EventsPromiseClient.prototype.createGame =
    function(request, metadata) {
  var _this = this;
  return new Promise(function (resolve, reject) {
    _this.delegateClient_.createGame(
      request, metadata, function (error, response) {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.tolymer.v1.UpdateGameRequest,
 *   !proto.tolymer.v1.Game>}
 */
const methodInfo_Events_UpdateGame = new grpc.web.AbstractClientBase.MethodInfo(
  proto.tolymer.v1.Game,
  /** @param {!proto.tolymer.v1.UpdateGameRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.tolymer.v1.Game.deserializeBinary
);


/**
 * @param {!proto.tolymer.v1.UpdateGameRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.tolymer.v1.Game)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.tolymer.v1.Game>|undefined}
 *     The XHR Node Readable Stream
 */
proto.tolymer.v1.EventsClient.prototype.updateGame =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/tolymer.v1.Events/UpdateGame',
      request,
      metadata || {},
      methodInfo_Events_UpdateGame,
      callback);
};


/**
 * @param {!proto.tolymer.v1.UpdateGameRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.tolymer.v1.Game>}
 *     The XHR Node Readable Stream
 */
proto.tolymer.v1.EventsPromiseClient.prototype.updateGame =
    function(request, metadata) {
  var _this = this;
  return new Promise(function (resolve, reject) {
    _this.delegateClient_.updateGame(
      request, metadata, function (error, response) {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.tolymer.v1.DeleteGameRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_Events_DeleteGame = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.tolymer.v1.DeleteGameRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.tolymer.v1.DeleteGameRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.tolymer.v1.EventsClient.prototype.deleteGame =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/tolymer.v1.Events/DeleteGame',
      request,
      metadata || {},
      methodInfo_Events_DeleteGame,
      callback);
};


/**
 * @param {!proto.tolymer.v1.DeleteGameRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.tolymer.v1.EventsPromiseClient.prototype.deleteGame =
    function(request, metadata) {
  var _this = this;
  return new Promise(function (resolve, reject) {
    _this.delegateClient_.deleteGame(
      request, metadata, function (error, response) {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.tolymer.v1.PostTipRequest,
 *   !proto.tolymer.v1.Tip>}
 */
const methodInfo_Events_PostTip = new grpc.web.AbstractClientBase.MethodInfo(
  proto.tolymer.v1.Tip,
  /** @param {!proto.tolymer.v1.PostTipRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.tolymer.v1.Tip.deserializeBinary
);


/**
 * @param {!proto.tolymer.v1.PostTipRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.tolymer.v1.Tip)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.tolymer.v1.Tip>|undefined}
 *     The XHR Node Readable Stream
 */
proto.tolymer.v1.EventsClient.prototype.postTip =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/tolymer.v1.Events/PostTip',
      request,
      metadata || {},
      methodInfo_Events_PostTip,
      callback);
};


/**
 * @param {!proto.tolymer.v1.PostTipRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.tolymer.v1.Tip>}
 *     The XHR Node Readable Stream
 */
proto.tolymer.v1.EventsPromiseClient.prototype.postTip =
    function(request, metadata) {
  var _this = this;
  return new Promise(function (resolve, reject) {
    _this.delegateClient_.postTip(
      request, metadata, function (error, response) {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.tolymer.v1.DeleteTipRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_Events_DeleteTip = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /** @param {!proto.tolymer.v1.DeleteTipRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.tolymer.v1.DeleteTipRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.tolymer.v1.EventsClient.prototype.deleteTip =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/tolymer.v1.Events/DeleteTip',
      request,
      metadata || {},
      methodInfo_Events_DeleteTip,
      callback);
};


/**
 * @param {!proto.tolymer.v1.DeleteTipRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     The XHR Node Readable Stream
 */
proto.tolymer.v1.EventsPromiseClient.prototype.deleteTip =
    function(request, metadata) {
  var _this = this;
  return new Promise(function (resolve, reject) {
    _this.delegateClient_.deleteTip(
      request, metadata, function (error, response) {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.tolymer.v1;

